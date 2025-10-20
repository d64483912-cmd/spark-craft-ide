import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Sparkles, Code2, FileCode } from 'lucide-react';
import { toast } from 'sonner';
import { aiRequestLimiter } from '@/lib/security/rateLimit';
import { sanitizeAIPrompt } from '@/lib/security/validation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface FileNode {
  name: string;
  path: string;
}

interface ChatPanelProps {
  projectId: string | null;
  onFileCreate: (fileName: string, content: string, language: string) => void;
  files: FileNode[];
}

interface CodeBlock {
  language: string;
  code: string;
  fileName?: string;
}

export const ChatPanel = ({ projectId, onFileCreate, files }: ChatPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI coding assistant. Tell me what you\'d like to build, and I\'ll help you generate the code.\n\nExamples:\n- "Create a simple HTML page with a button"\n- "Build a React component for a todo list"\n- "Generate a package.json for a Vite React project"',
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Parse code blocks from markdown
  const parseCodeBlocks = (content: string): CodeBlock[] => {
    const codeBlockRegex = /```(\w+)?\s*(?:\/\/\s*(.+?))?\n([\s\S]*?)```/g;
    const blocks: CodeBlock[] = [];
    let match;

    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'text';
      const fileName = match[2]?.trim();
      const code = match[3].trim();
      
      blocks.push({
        language,
        code,
        fileName,
      });
    }

    return blocks;
  };

  // Auto-detect file name from code content
  const detectFileName = (code: string, language: string): string => {
    // Check for file name comment at the top
    const fileNameComment = code.match(/^\/\/\s*(.+?\.(jsx?|tsx?|css|html|json))/);
    if (fileNameComment) {
      return fileNameComment[1];
    }

    // Default file names based on language
    const defaults: Record<string, string> = {
      html: 'index.html',
      css: 'styles.css',
      javascript: 'script.js',
      typescript: 'index.ts',
      jsx: 'App.jsx',
      tsx: 'App.tsx',
      json: 'package.json',
    };

    return defaults[language] || `file.${language}`;
  };

  const handleCodeBlockCreate = (block: CodeBlock) => {
    const fileName = block.fileName || detectFileName(block.code, block.language);
    const language = block.language === 'jsx' || block.language === 'tsx' 
      ? 'javascript' 
      : block.language;
    
    onFileCreate(fileName, block.code, language);
    toast.success(`Created ${fileName}`);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // Rate limit check
    const userId = 'user_' + (projectId || 'default');
    const rateLimitResult = aiRequestLimiter.check(userId);
    if (!rateLimitResult.allowed) {
      const resetInSeconds = Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000);
      toast.error(`Rate limit exceeded. Please wait ${resetInSeconds} seconds before making another AI request.`);
      return;
    }

    // Sanitize input
    const sanitizedInput = sanitizeAIPrompt(input);
    const userMessage: Message = { role: 'user', content: sanitizedInput };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://bnjthwrpigvchbhsmfec.supabase.co/functions/v1/generate-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            messages: [...messages, userMessage],
            projectContext: {
              files: files.map(f => ({ name: f.name, path: f.path }))
            }
          }),
        }
      );

      if (!response.ok || !response.body) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to generate code');
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';
      
      // Add empty assistant message that we'll update
      setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') continue;
            
            try {
              const parsed = JSON.parse(data);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) {
                assistantMessage += content;
                setMessages(prev => {
                  const newMessages = [...prev];
                  newMessages[newMessages.length - 1] = {
                    role: 'assistant',
                    content: assistantMessage
                  };
                  return newMessages;
                });
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }

      // Auto-create files from code blocks if the response contains them
      const codeBlocks = parseCodeBlocks(assistantMessage);
      if (codeBlocks.length > 0) {
        toast.info(`Found ${codeBlocks.length} code block(s). Click to create files.`);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to generate code');
      setMessages(prev => prev.slice(0, -1)); // Remove the empty assistant message
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message, index: number) => {
    const codeBlocks = parseCodeBlocks(message.content);
    const textContent = message.content.replace(/```[\s\S]*?```/g, '').trim();

    return (
      <div
        key={index}
        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
      >
        <div
          className={`max-w-[85%] rounded-lg p-3 ${
            message.role === 'user'
              ? 'bg-primary text-primary-foreground'
              : 'bg-[hsl(var(--panel-bg))] border border-border'
          }`}
        >
          {textContent && (
            <p className="text-sm whitespace-pre-wrap mb-2">{textContent}</p>
          )}
          
          {codeBlocks.map((block, blockIndex) => (
            <div key={blockIndex} className="mt-2 rounded-md overflow-hidden border border-border">
              <div className="flex items-center justify-between bg-[hsl(var(--editor-bg))] px-3 py-2">
                <div className="flex items-center gap-2">
                  <FileCode className="w-4 h-4" />
                  <span className="text-xs font-mono">
                    {block.fileName || detectFileName(block.code, block.language)}
                  </span>
                  <span className="text-xs text-muted-foreground">{block.language}</span>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleCodeBlockCreate(block)}
                  className="h-6 text-xs"
                >
                  <Code2 className="w-3 h-3 mr-1" />
                  Create File
                </Button>
              </div>
              <pre className="p-3 overflow-x-auto bg-[hsl(var(--editor-bg))] text-xs">
                <code>{block.code}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">AI Assistant</h2>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          Powered by Gemini 2.5 Flash
        </p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, index) => renderMessage(message, index))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-[hsl(var(--panel-bg))] border border-border rounded-lg p-3">
                <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe what you want to build..."
            className="resize-none bg-[hsl(var(--input))] border-border focus:border-primary min-h-[60px]"
            disabled={isLoading}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            size="icon"
            className="bg-primary hover:bg-primary/90 h-[60px] w-[60px]"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
