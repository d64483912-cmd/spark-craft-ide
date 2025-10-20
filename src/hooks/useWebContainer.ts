import { useState, useEffect, useCallback, useRef } from 'react';
import { WebContainer } from '@webcontainer/api';
import { toast } from 'sonner';

interface FileNode {
  name: string;
  path: string;
  content: string;
  language: string;
  isFolder?: boolean;
  children?: FileNode[];
}

interface UseWebContainerReturn {
  webContainer: WebContainer | null;
  isBooting: boolean;
  isRunning: boolean;
  url: string | null;
  logs: string[];
  syncFiles: (files: FileNode[]) => Promise<void>;
  installDependencies: () => Promise<void>;
  startDevServer: () => Promise<void>;
  stopDevServer: () => void;
}

export const useWebContainer = (): UseWebContainerReturn => {
  const [webContainer, setWebContainer] = useState<WebContainer | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isRunning, setIsRunning] = useState(false);
  const [url, setUrl] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const processRef = useRef<any>(null);

  // Boot WebContainer on mount
  useEffect(() => {
    let mounted = true;

    const bootWebContainer = async () => {
      try {
        setIsBooting(true);
        const instance = await WebContainer.boot();
        
        if (mounted) {
          setWebContainer(instance);
          setIsBooting(false);
          toast.success('WebContainer ready!');
        }
      } catch (error) {
        console.error('Failed to boot WebContainer:', error);
        if (mounted) {
          setIsBooting(false);
          toast.error('Failed to initialize WebContainer');
        }
      }
    };

    bootWebContainer();

    return () => {
      mounted = false;
      if (processRef.current) {
        processRef.current.kill();
      }
    };
  }, []);

  const addLog = useCallback((message: string) => {
    setLogs(prev => [...prev.slice(-99), message]);
  }, []);

  // Convert FileNode array to WebContainer file tree format
  const buildFileTree = useCallback((files: FileNode[]): Record<string, { file: { contents: string } }> => {
    const tree: Record<string, { file: { contents: string } }> = {};

    files.forEach(file => {
      if (!file.isFolder) {
        const pathParts = file.path.split('/').filter(Boolean);
        const fileName = pathParts[pathParts.length - 1];
        
        tree[fileName] = {
          file: {
            contents: file.content,
          },
        };
      }
    });

    return tree;
  }, []);

  const syncFiles = useCallback(async (files: FileNode[]) => {
    if (!webContainer) {
      toast.error('WebContainer not ready');
      return;
    }

    try {
      const fileTree = buildFileTree(files);
      await webContainer.mount(fileTree);
      addLog('Files synced successfully');
    } catch (error) {
      console.error('Failed to sync files:', error);
      toast.error('Failed to sync files');
    }
  }, [webContainer, buildFileTree, addLog]);

  const installDependencies = useCallback(async () => {
    if (!webContainer) {
      toast.error('WebContainer not ready');
      return;
    }

    try {
      addLog('Installing dependencies...');
      toast.info('Installing dependencies...');

      const installProcess = await webContainer.spawn('npm', ['install']);
      
      installProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            addLog(data);
          },
        })
      );

      const exitCode = await installProcess.exit;
      
      if (exitCode !== 0) {
        throw new Error(`Installation failed with exit code ${exitCode}`);
      }

      addLog('Dependencies installed successfully');
      toast.success('Dependencies installed!');
    } catch (error) {
      console.error('Failed to install dependencies:', error);
      toast.error('Failed to install dependencies');
      addLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [webContainer, addLog]);

  const startDevServer = useCallback(async () => {
    if (!webContainer) {
      toast.error('WebContainer not ready');
      return;
    }

    try {
      addLog('Starting development server...');
      
      // Try to start a dev server (works for Vite, Next.js, etc.)
      processRef.current = await webContainer.spawn('npm', ['run', 'dev']);
      
      processRef.current.output.pipeTo(
        new WritableStream({
          write(data) {
            addLog(data);
          },
        })
      );

      // Listen for server ready event
      webContainer.on('server-ready', (port, url) => {
        setUrl(url);
        setIsRunning(true);
        addLog(`Server running at ${url}`);
        toast.success('Development server started!');
      });

    } catch (error) {
      console.error('Failed to start dev server:', error);
      toast.error('Failed to start development server');
      addLog(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }, [webContainer, addLog]);

  const stopDevServer = useCallback(() => {
    if (processRef.current) {
      processRef.current.kill();
      processRef.current = null;
      setIsRunning(false);
      setUrl(null);
      addLog('Development server stopped');
      toast.info('Development server stopped');
    }
  }, [addLog]);

  return {
    webContainer,
    isBooting,
    isRunning,
    url,
    logs,
    syncFiles,
    installDependencies,
    startDevServer,
    stopDevServer,
  };
};
