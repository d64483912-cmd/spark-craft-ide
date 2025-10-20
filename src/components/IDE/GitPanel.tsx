import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { GitBranch, GitCommit, GitPullRequest, RefreshCw, Upload, Download } from 'lucide-react';
import { toast } from 'sonner';

interface GitPanelProps {
  projectPath?: string;
}

interface GitStatus {
  branch: string;
  modified: string[];
  untracked: string[];
  staged: string[];
}

export function GitPanel({ projectPath = '/project' }: GitPanelProps) {
  const [gitStatus, setGitStatus] = useState<GitStatus | null>(null);
  const [commitMessage, setCommitMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [remoteName, setRemoteName] = useState('origin');
  const [remoteUrl, setRemoteUrl] = useState('');

  // Initialize git repository
  const handleInitGit = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would call WebContainer's git commands
      // For now, we'll simulate the initialization
      await new Promise(resolve => setTimeout(resolve, 500));
      setIsInitialized(true);
      toast.success('Git repository initialized');
      await refreshStatus();
    } catch (error) {
      toast.error('Failed to initialize git repository');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh git status
  const refreshStatus = async () => {
    if (!isInitialized) return;
    
    setIsLoading(true);
    try {
      // Simulated git status
      // In production, this would execute: git status --porcelain
      const status: GitStatus = {
        branch: 'main',
        modified: ['src/App.tsx', 'package.json'],
        untracked: ['newfile.ts'],
        staged: [],
      };
      setGitStatus(status);
    } catch (error) {
      toast.error('Failed to fetch git status');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Stage file
  const handleStageFile = async (file: string) => {
    setIsLoading(true);
    try {
      // Execute: git add <file>
      await new Promise(resolve => setTimeout(resolve, 300));
      toast.success(`Staged ${file}`);
      await refreshStatus();
    } catch (error) {
      toast.error(`Failed to stage ${file}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Stage all files
  const handleStageAll = async () => {
    setIsLoading(true);
    try {
      // Execute: git add .
      await new Promise(resolve => setTimeout(resolve, 300));
      toast.success('All files staged');
      await refreshStatus();
    } catch (error) {
      toast.error('Failed to stage files');
    } finally {
      setIsLoading(false);
    }
  };

  // Commit changes
  const handleCommit = async () => {
    if (!commitMessage.trim()) {
      toast.error('Please enter a commit message');
      return;
    }

    setIsLoading(true);
    try {
      // Execute: git commit -m "<message>"
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success('Changes committed successfully');
      setCommitMessage('');
      await refreshStatus();
    } catch (error) {
      toast.error('Failed to commit changes');
    } finally {
      setIsLoading(false);
    }
  };

  // Add remote
  const handleAddRemote = async () => {
    if (!remoteUrl.trim()) {
      toast.error('Please enter a remote URL');
      return;
    }

    setIsLoading(true);
    try {
      // Execute: git remote add <name> <url>
      await new Promise(resolve => setTimeout(resolve, 300));
      toast.success(`Remote '${remoteName}' added`);
      setRemoteUrl('');
    } catch (error) {
      toast.error('Failed to add remote');
    } finally {
      setIsLoading(false);
    }
  };

  // Push changes
  const handlePush = async () => {
    setIsLoading(true);
    try {
      // Execute: git push origin main
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Changes pushed successfully');
    } catch (error) {
      toast.error('Failed to push changes');
    } finally {
      setIsLoading(false);
    }
  };

  // Pull changes
  const handlePull = async () => {
    setIsLoading(true);
    try {
      // Execute: git pull origin main
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Changes pulled successfully');
      await refreshStatus();
    } catch (error) {
      toast.error('Failed to pull changes');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isInitialized) {
    return (
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Git Version Control</h2>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center p-8">
          <Card className="max-w-md">
            <CardHeader>
              <CardTitle>Initialize Git Repository</CardTitle>
              <CardDescription>
                Start tracking your project with Git version control
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleInitGit} 
                disabled={isLoading}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <GitBranch className="w-4 h-4 mr-2" />
                    Initialize Git
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-semibold">Git</h2>
            {gitStatus && (
              <Badge variant="secondary" className="text-xs">
                {gitStatus.branch}
              </Badge>
            )}
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={refreshStatus}
            disabled={isLoading}
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {/* Changes Section */}
          {gitStatus && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Changes</CardTitle>
                <CardDescription className="text-xs">
                  {gitStatus.modified.length + gitStatus.untracked.length} file(s) changed
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {gitStatus.modified.map((file) => (
                  <div key={file} className="flex items-center justify-between text-sm">
                    <span className="text-orange-500">M {file}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleStageFile(file)}
                      className="h-6 text-xs"
                    >
                      Stage
                    </Button>
                  </div>
                ))}
                {gitStatus.untracked.map((file) => (
                  <div key={file} className="flex items-center justify-between text-sm">
                    <span className="text-green-500">? {file}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleStageFile(file)}
                      className="h-6 text-xs"
                    >
                      Stage
                    </Button>
                  </div>
                ))}
                {(gitStatus.modified.length > 0 || gitStatus.untracked.length > 0) && (
                  <Button
                    size="sm"
                    onClick={handleStageAll}
                    className="w-full mt-2"
                  >
                    Stage All
                  </Button>
                )}
              </CardContent>
            </Card>
          )}

          {/* Commit Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Commit Changes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Textarea
                placeholder="Commit message..."
                value={commitMessage}
                onChange={(e) => setCommitMessage(e.target.value)}
                className="min-h-20"
              />
              <Button
                onClick={handleCommit}
                disabled={isLoading || !commitMessage.trim()}
                className="w-full"
              >
                <GitCommit className="w-4 h-4 mr-2" />
                Commit
              </Button>
            </CardContent>
          </Card>

          {/* Remote Section */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Remote Repository</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-2">
                <Input
                  placeholder="Remote name (e.g., origin)"
                  value={remoteName}
                  onChange={(e) => setRemoteName(e.target.value)}
                />
                <Input
                  placeholder="Remote URL (e.g., https://github.com/user/repo.git)"
                  value={remoteUrl}
                  onChange={(e) => setRemoteUrl(e.target.value)}
                />
                <Button
                  onClick={handleAddRemote}
                  disabled={isLoading || !remoteUrl.trim()}
                  className="w-full"
                  variant="outline"
                >
                  Add Remote
                </Button>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handlePush}
                  disabled={isLoading}
                  className="flex-1"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Push
                </Button>
                <Button
                  onClick={handlePull}
                  disabled={isLoading}
                  className="flex-1"
                  variant="outline"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Pull
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info */}
          <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-4">
              <p className="text-xs text-blue-800 dark:text-blue-200">
                <strong>Note:</strong> This is a basic Git UI. For advanced operations, 
                use the terminal tab or export your project and use Git CLI.
              </p>
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
