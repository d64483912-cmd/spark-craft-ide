import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  FolderOpen, 
  FileText, 
  Plus,
  ChevronRight,
  ChevronDown,
  FilePlus,
  FolderPlus,
  Trash2
} from 'lucide-react';
import { toast } from 'sonner';

interface FileNode {
  id: string;
  name: string;
  path: string;
  isFolder?: boolean;
  children?: FileNode[];
}

interface FileTreeProps {
  files: FileNode[];
  activeFile: FileNode | null;
  onFileSelect: (file: FileNode) => void;
  onFileCreate?: (fileName: string, isFolder: boolean) => void;
  onFileDelete?: (fileId: string) => void;
}

export const FileTree = ({ 
  files, 
  activeFile, 
  onFileSelect,
  onFileCreate,
  onFileDelete 
}: FileTreeProps) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [createType, setCreateType] = useState<'file' | 'folder'>('file');

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(folderId)) {
        next.delete(folderId);
      } else {
        next.add(folderId);
      }
      return next;
    });
  };

  const handleCreateFile = () => {
    if (!newFileName.trim()) {
      toast.error('Please enter a file name');
      return;
    }

    if (onFileCreate) {
      onFileCreate(newFileName, createType === 'folder');
      setNewFileName('');
      setIsCreateDialogOpen(false);
      toast.success(`${createType === 'folder' ? 'Folder' : 'File'} created successfully`);
    }
  };

  const handleDeleteFile = (e: React.MouseEvent, fileId: string, fileName: string) => {
    e.stopPropagation();
    
    if (window.confirm(`Are you sure you want to delete ${fileName}?`)) {
      if (onFileDelete) {
        onFileDelete(fileId);
        toast.success('File deleted successfully');
      }
    }
  };

  const openCreateDialog = (type: 'file' | 'folder') => {
    setCreateType(type);
    setIsCreateDialogOpen(true);
  };

  const renderFileNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.id);
    const isActive = activeFile?.id === node.id;

    if (node.isFolder) {
      return (
        <div key={node.id}>
          <div className="group relative">
            <button
              onClick={() => toggleFolder(node.id)}
              className="w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-[hsl(var(--hover-bg))] transition-colors"
              style={{ paddingLeft: `${depth * 12 + 12}px` }}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
              <FolderOpen className="w-4 h-4 text-primary" />
              <span>{node.name}</span>
            </button>
            {onFileDelete && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => handleDeleteFile(e, node.id, node.name)}
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
          {isExpanded && node.children?.map(child => renderFileNode(child, depth + 1))}
        </div>
      );
    }

    return (
      <div key={node.id} className="group relative">
        <button
          onClick={() => onFileSelect(node)}
          className={`w-full flex items-center gap-2 px-3 py-1.5 text-sm hover:bg-[hsl(var(--hover-bg))] transition-colors ${
            isActive ? 'bg-[hsl(var(--active-bg))] text-primary' : ''
          }`}
          style={{ paddingLeft: `${depth * 12 + 28}px` }}
        >
          <FileText className="w-4 h-4" />
          <span className="truncate">{node.name}</span>
        </button>
        {onFileDelete && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => handleDeleteFile(e, node.id, node.name)}
          >
            <Trash2 className="w-3 h-3" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border">
        <span className="text-sm font-semibold">Files</span>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6 hover:bg-[hsl(var(--hover-bg))]"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New</DialogTitle>
              <DialogDescription>
                Choose what you want to create
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button
                  variant={createType === 'file' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setCreateType('file')}
                >
                  <FilePlus className="w-4 h-4 mr-2" />
                  File
                </Button>
                <Button
                  variant={createType === 'folder' ? 'default' : 'outline'}
                  className="flex-1"
                  onClick={() => setCreateType('folder')}
                >
                  <FolderPlus className="w-4 h-4 mr-2" />
                  Folder
                </Button>
              </div>
              <Input
                placeholder={createType === 'file' ? 'Enter file name (e.g., index.html)' : 'Enter folder name'}
                value={newFileName}
                onChange={(e) => setNewFileName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleCreateFile();
                  }
                }}
              />
              <Button onClick={handleCreateFile} className="w-full">
                Create {createType === 'folder' ? 'Folder' : 'File'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick Actions */}
      {onFileCreate && (
        <div className="flex gap-1 p-2 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => openCreateDialog('file')}
          >
            <FilePlus className="w-3 h-3 mr-1" />
            New File
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 text-xs"
            onClick={() => openCreateDialog('folder')}
          >
            <FolderPlus className="w-3 h-3 mr-1" />
            New Folder
          </Button>
        </div>
      )}

      {/* File List */}
      <ScrollArea className="flex-1">
        <div className="py-2">
          {files.length === 0 ? (
            <div className="px-3 py-8 text-center text-sm text-muted-foreground">
              No files yet. Create one using the AI assistant or the + button!
            </div>
          ) : (
            files.map(file => renderFileNode(file))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
