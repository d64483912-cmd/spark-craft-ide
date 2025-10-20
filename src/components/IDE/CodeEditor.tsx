import { Editor } from '@monaco-editor/react';

interface FileNode {
  name: string;
  content: string;
  language: string;
}

interface CodeEditorProps {
  file: FileNode | null;
  onChange: (content: string) => void;
}

export const CodeEditor = ({ file, onChange }: CodeEditorProps) => {
  if (!file) {
    return (
      <div className="flex items-center justify-center h-full bg-[hsl(var(--editor-bg))] text-muted-foreground">
        <div className="text-center space-y-2">
          <p className="text-lg">No file selected</p>
          <p className="text-sm">Select a file from the file tree or create one using the AI assistant</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-[hsl(var(--editor-bg))]">
      <Editor
        height="100%"
        defaultLanguage={file.language}
        language={file.language}
        value={file.content}
        onChange={(value) => onChange(value || '')}
        theme="vs-dark"
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          lineNumbers: 'on',
          roundedSelection: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Consolas', 'Monaco', monospace",
          fontLigatures: true,
          cursorBlinking: 'smooth',
          smoothScrolling: true,
          contextmenu: true,
          mouseWheelZoom: true,
        }}
      />
    </div>
  );
};