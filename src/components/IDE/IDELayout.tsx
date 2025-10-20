import { useState } from 'react';
import { ChatPanel } from './ChatPanel';
import { CodeEditor } from './CodeEditor';
import { PreviewPanel } from './PreviewPanel';
import { FileTree } from './FileTree';
import { ExportImportMenu } from './ExportImportMenu';
import { TemplateSelector } from './TemplateSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Eye, FolderTree } from 'lucide-react';
import { toast } from 'sonner';
import { ProjectTemplate } from '@/lib/templates';

interface FileNode {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isFolder?: boolean;
  children?: FileNode[];
}

export const IDELayout = () => {
  const [activeFile, setActiveFile] = useState<FileNode | null>(null);
  const [files, setFiles] = useState<FileNode[]>([
    {
      id: '1',
      name: 'index.html',
      path: '/index.html',
      content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>SparkCraft IDE</title>\n</head>\n<body>\n  <div id="app">\n    <h1>Welcome to SparkCraft IDE! 🚀</h1>\n    <p>Start building amazing web applications with AI assistance.</p>\n  </div>\n</body>\n</html>',
      language: 'html',
    }
  ]);
  const [projectId, setProjectId] = useState<string | null>(null);

  const handleFileSelect = (file: FileNode) => {
    if (!file.isFolder) {
      setActiveFile(file);
    }
  };

  const handleCodeChange = (newContent: string) => {
    if (activeFile) {
      const updatedFile = { ...activeFile, content: newContent };
      setActiveFile(updatedFile);
      setFiles(prevFiles => 
        prevFiles.map(f => f.id === activeFile.id ? updatedFile : f)
      );
    }
  };

  const getLanguageFromFileName = (fileName: string): string => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const languageMap: Record<string, string> = {
      html: 'html',
      css: 'css',
      js: 'javascript',
      jsx: 'javascript',
      ts: 'typescript',
      tsx: 'typescript',
      json: 'json',
      md: 'markdown',
      py: 'python',
      java: 'java',
      cpp: 'cpp',
      c: 'c',
      xml: 'xml',
      yaml: 'yaml',
      yml: 'yaml',
    };
    return languageMap[ext || ''] || 'plaintext';
  };

  const handleCreateFile = (fileName: string, content: string, language: string) => {
    // Check if file already exists
    const existingFile = files.find(f => f.name === fileName);
    if (existingFile) {
      // Update existing file
      const updatedFile = { ...existingFile, content };
      setFiles(prevFiles => 
        prevFiles.map(f => f.id === existingFile.id ? updatedFile : f)
      );
      setActiveFile(updatedFile);
      toast.info(`Updated ${fileName}`);
    } else {
      // Create new file
      const newFile: FileNode = {
        id: Date.now().toString(),
        name: fileName,
        path: `/${fileName}`,
        content,
        language,
      };
      setFiles(prevFiles => [...prevFiles, newFile]);
      setActiveFile(newFile);
    }
  };

  const handleFileCreateFromTree = (fileName: string, isFolder: boolean) => {
    if (isFolder) {
      const newFolder: FileNode = {
        id: Date.now().toString(),
        name: fileName,
        path: `/${fileName}`,
        content: '',
        language: '',
        isFolder: true,
        children: [],
      };
      setFiles(prevFiles => [...prevFiles, newFolder]);
    } else {
      const language = getLanguageFromFileName(fileName);
      const defaultContent = getDefaultContent(fileName, language);
      
      const newFile: FileNode = {
        id: Date.now().toString(),
        name: fileName,
        path: `/${fileName}`,
        content: defaultContent,
        language,
      };
      setFiles(prevFiles => [...prevFiles, newFile]);
      setActiveFile(newFile);
    }
  };

  const getDefaultContent = (fileName: string, language: string): string => {
    if (fileName === 'package.json') {
      return JSON.stringify({
        "name": "my-project",
        "version": "1.0.0",
        "type": "module",
        "scripts": {
          "dev": "vite",
          "build": "vite build",
          "preview": "vite preview"
        },
        "dependencies": {
          "react": "^18.3.1",
          "react-dom": "^18.3.1"
        },
        "devDependencies": {
          "vite": "^5.0.0",
          "@vitejs/plugin-react": "^4.2.0"
        }
      }, null, 2);
    }

    const templates: Record<string, string> = {
      html: '<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Document</title>\n</head>\n<body>\n  \n</body>\n</html>',
      css: '/* Styles */\n',
      javascript: '// JavaScript\n',
      typescript: '// TypeScript\n',
      json: '{\n  \n}',
    };

    return templates[language] || '';
  };

  const handleFileDelete = (fileId: string) => {
    setFiles(prevFiles => prevFiles.filter(f => f.id !== fileId));
    if (activeFile?.id === fileId) {
      setActiveFile(null);
    }
  };

  const handleImport = (importedFiles: FileNode[]) => {
    // Replace existing files with imported ones
    setFiles(importedFiles);
    setActiveFile(null);
    toast.success('Project imported successfully!');
  };

  const handleSelectTemplate = (template: ProjectTemplate) => {
    // Convert template files to FileNode format
    const templateFiles: FileNode[] = template.files.map((file, index) => ({
      id: (Date.now() + index).toString(),
      name: file.name,
      path: file.path,
      content: file.content,
      language: file.language,
    }));

    // Replace existing files with template files
    setFiles(templateFiles);
    // Set the first file as active
    if (templateFiles.length > 0) {
      setActiveFile(templateFiles[0]);
    }
    toast.success(`Template "${template.name}" loaded successfully!`);
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Chat Panel - Left Side */}
      <div className="w-96 border-r border-border flex flex-col bg-[hsl(var(--sidebar-bg))]">
        <ChatPanel 
          projectId={projectId}
          onFileCreate={handleCreateFile}
          files={files}
        />
      </div>

      {/* Middle Section - File Tree & Editor */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex h-full">
          {/* File Tree Sidebar */}
          <div className="w-64 border-r border-border bg-[hsl(var(--sidebar-bg))]">
            <FileTree
              files={files}
              activeFile={activeFile}
              onFileSelect={handleFileSelect}
              onFileCreate={handleFileCreateFromTree}
              onFileDelete={handleFileDelete}
            />
          </div>

          {/* Editor & Preview Tabs */}
          <div className="flex-1 flex flex-col min-w-0">
            <Tabs defaultValue="editor" className="flex-1 flex flex-col">
              <div className="border-b border-border bg-[hsl(var(--panel-bg))] px-4 flex items-center justify-between">
                <TabsList className="bg-transparent border-0">
                  <TabsTrigger 
                    value="editor" 
                    className="data-[state=active]:bg-[hsl(var(--active-bg))] data-[state=active]:text-primary"
                  >
                    <Code2 className="w-4 h-4 mr-2" />
                    Code
                  </TabsTrigger>
                  <TabsTrigger 
                    value="preview"
                    className="data-[state=active]:bg-[hsl(var(--active-bg))] data-[state=active]:text-primary"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger 
                    value="split"
                    className="data-[state=active]:bg-[hsl(var(--active-bg))] data-[state=active]:text-primary"
                  >
                    <FolderTree className="w-4 h-4 mr-2" />
                    Split
                  </TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                  <TemplateSelector onSelectTemplate={handleSelectTemplate} />
                  <ExportImportMenu 
                    files={files}
                    projectName="my-project"
                    onImport={handleImport}
                  />
                </div>
              </div>

              <TabsContent value="editor" className="flex-1 m-0 p-0">
                <CodeEditor
                  file={activeFile}
                  onChange={handleCodeChange}
                />
              </TabsContent>

              <TabsContent value="preview" className="flex-1 m-0 p-0">
                <PreviewPanel files={files} />
              </TabsContent>

              <TabsContent value="split" className="flex-1 m-0 p-0 flex">
                <div className="flex-1 border-r border-border">
                  <CodeEditor
                    file={activeFile}
                    onChange={handleCodeChange}
                  />
                </div>
                <div className="flex-1">
                  <PreviewPanel files={files} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
