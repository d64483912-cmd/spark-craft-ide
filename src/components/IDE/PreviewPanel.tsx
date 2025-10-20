import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, Play, Square, Package, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useWebContainer } from '@/hooks/useWebContainer';

interface FileNode {
  name: string;
  content: string;
  language: string;
  path: string;
}

interface PreviewPanelProps {
  files: FileNode[];
}

export const PreviewPanel = ({ files }: PreviewPanelProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [key, setKey] = useState(0);
  const [previewMode, setPreviewMode] = useState<'simple' | 'webcontainer'>('simple');
  
  const {
    isBooting,
    isRunning,
    url,
    logs,
    syncFiles,
    installDependencies,
    startDevServer,
    stopDevServer,
  } = useWebContainer();

  // Detect if project needs WebContainer (has package.json)
  useEffect(() => {
    const hasPackageJson = files.some(f => f.name === 'package.json');
    if (hasPackageJson && previewMode === 'simple') {
      setPreviewMode('webcontainer');
    }
  }, [files, previewMode]);

  // Simple preview mode (for HTML/CSS/JS)
  useEffect(() => {
    if (previewMode !== 'simple' || !iframeRef.current) return;

    const htmlFile = files.find(f => f.language === 'html' || f.name.endsWith('.html'));
    const cssFiles = files.filter(f => f.language === 'css' || f.name.endsWith('.css'));
    const jsFiles = files.filter(f => f.language === 'javascript' || f.name.endsWith('.js') || f.name.endsWith('.jsx'));

    if (!htmlFile) {
      const doc = iframeRef.current.contentDocument;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <body style="margin: 0; padding: 40px; font-family: sans-serif; background: #1a1a1a; color: #fff; display: flex; align-items: center; justify-content: center; min-height: 100vh;">
              <div style="text-align: center;">
                <h2>No preview available</h2>
                <p style="color: #888;">Create an HTML file or add a package.json for advanced projects</p>
              </div>
            </body>
          </html>
        `);
        doc.close();
      }
      return;
    }

    let html = htmlFile.content;

    // Inject CSS
    if (cssFiles.length > 0) {
      const styles = cssFiles.map(f => `<style>${f.content}</style>`).join('\n');
      if (html.includes('</head>')) {
        html = html.replace('</head>', `${styles}</head>`);
      } else {
        html = `<head>${styles}</head>${html}`;
      }
    }

    // Inject JS
    if (jsFiles.length > 0) {
      const scripts = jsFiles.map(f => `<script type="module">${f.content}</script>`).join('\n');
      if (html.includes('</body>')) {
        html = html.replace('</body>', `${scripts}</body>`);
      } else {
        html = `${html}${scripts}`;
      }
    }

    const doc = iframeRef.current.contentDocument;
    if (doc) {
      doc.open();
      doc.write(html);
      doc.close();
    }
  }, [files, key, previewMode]);

  const handleRefresh = () => {
    setKey(prev => prev + 1);
  };

  const handleSyncAndRun = async () => {
    await syncFiles(files);
    await installDependencies();
    await startDevServer();
  };

  if (previewMode === 'webcontainer') {
    return (
      <div className="flex flex-col h-full bg-[hsl(var(--editor-bg))]">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-2 border-b border-border bg-[hsl(var(--panel-bg))]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">WebContainer Preview</span>
            {isBooting && (
              <Badge variant="outline" className="text-xs">
                Booting...
              </Badge>
            )}
            {isRunning && (
              <Badge className="text-xs bg-green-600">
                Running
              </Badge>
            )}
          </div>
          <div className="flex gap-2">
            {!isRunning ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleSyncAndRun}
                  disabled={isBooting}
                  className="hover:bg-[hsl(var(--hover-bg))]"
                >
                  <Play className="w-4 h-4 mr-1" />
                  Run
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => installDependencies()}
                  disabled={isBooting}
                  className="hover:bg-[hsl(var(--hover-bg))]"
                >
                  <Package className="w-4 h-4 mr-1" />
                  Install
                </Button>
              </>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                onClick={stopDevServer}
                className="hover:bg-[hsl(var(--hover-bg))]"
              >
                <Square className="w-4 h-4 mr-1" />
                Stop
              </Button>
            )}
            {url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(url, '_blank')}
                className="hover:bg-[hsl(var(--hover-bg))]"
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <Tabs defaultValue="preview" className="flex-1 flex flex-col">
          <div className="border-b border-border bg-[hsl(var(--panel-bg))] px-4">
            <TabsList className="bg-transparent border-0">
              <TabsTrigger value="preview">Preview</TabsTrigger>
              <TabsTrigger value="logs">Console ({logs.length})</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="preview" className="flex-1 m-0 p-0">
            {url ? (
              <iframe
                key={url}
                src={url}
                title="preview"
                className="flex-1 w-full h-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-modals allow-popups"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center space-y-2">
                  <p className="text-lg">No server running</p>
                  <p className="text-sm">Click "Run" to start the development server</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="logs" className="flex-1 m-0 p-0">
            <ScrollArea className="h-full p-4">
              <div className="font-mono text-xs space-y-1">
                {logs.length === 0 ? (
                  <p className="text-muted-foreground">No logs yet</p>
                ) : (
                  logs.map((log, index) => (
                    <div key={index} className="text-foreground whitespace-pre-wrap">
                      {log}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
    );
  }

  // Simple preview mode
  return (
    <div className="flex flex-col h-full bg-[hsl(var(--editor-bg))]">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-2 border-b border-border bg-[hsl(var(--panel-bg))]">
        <span className="text-sm text-muted-foreground">Live Preview</span>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRefresh}
          className="hover:bg-[hsl(var(--hover-bg))]"
        >
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Preview iframe */}
      <iframe
        key={key}
        ref={iframeRef}
        title="preview"
        className="flex-1 w-full bg-white"
        sandbox="allow-scripts"
      />
    </div>
  );
};
