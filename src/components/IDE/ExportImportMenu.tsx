import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Download, Upload, Copy, FileJson, FileText } from 'lucide-react';
import {
  exportProject,
  exportProjectAsZip,
  importProject,
  copyProjectToClipboard,
  importFromClipboard,
  type ProjectExport,
} from '@/lib/exportImport';

interface FileNode {
  id: string;
  name: string;
  path: string;
  content: string;
  language: string;
  isFolder?: boolean;
  children?: FileNode[];
}

interface ExportImportMenuProps {
  files: FileNode[];
  projectName?: string;
  onImport: (files: FileNode[]) => void;
}

export const ExportImportMenu = ({ files, projectName = 'project', onImport }: ExportImportMenuProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isImporting, setIsImporting] = useState(false);

  const handleExportJSON = () => {
    exportProject(files, projectName);
  };

  const handleExportText = () => {
    exportProjectAsZip(files, projectName);
  };

  const handleCopyToClipboard = async () => {
    await copyProjectToClipboard(files, projectName);
  };

  const handleImportFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const projectData = await importProject(file);
      onImport(projectData.files);
    } catch (error) {
      console.error('Import error:', error);
    } finally {
      setIsImporting(false);
      // Reset input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleImportFromClipboard = async () => {
    setIsImporting(true);
    try {
      const projectData = await importFromClipboard();
      onImport(projectData.files);
    } catch (error) {
      console.error('Clipboard import error:', error);
    } finally {
      setIsImporting(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="gap-2">
            <Download className="w-4 h-4" />
            Export/Import
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Export Project</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleExportJSON}>
            <FileJson className="w-4 h-4 mr-2" />
            Export as JSON
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleExportText}>
            <FileText className="w-4 h-4 mr-2" />
            Export as Text
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyToClipboard}>
            <Copy className="w-4 h-4 mr-2" />
            Copy to Clipboard
          </DropdownMenuItem>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuLabel>Import Project</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleImportFile} disabled={isImporting}>
            <Upload className="w-4 h-4 mr-2" />
            {isImporting ? 'Importing...' : 'Import from File'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleImportFromClipboard} disabled={isImporting}>
            <Copy className="w-4 h-4 mr-2" />
            Import from Clipboard
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
};
