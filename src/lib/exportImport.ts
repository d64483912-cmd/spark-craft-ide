import { toast } from 'sonner';

export interface ProjectExport {
  version: string;
  name: string;
  exportDate: string;
  files: Array<{
    id: string;
    name: string;
    path: string;
    content: string;
    language: string;
    isFolder?: boolean;
    children?: ProjectExport['files'];
  }>;
}

/**
 * Export project files as JSON
 */
export function exportProject(files: ProjectExport['files'], projectName: string = 'project'): void {
  try {
    const exportData: ProjectExport = {
      version: '1.0.0',
      name: projectName,
      exportDate: new Date().toISOString(),
      files: files,
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName}-${Date.now()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Project exported successfully!');
  } catch (error) {
    console.error('Export failed:', error);
    toast.error('Failed to export project');
  }
}

/**
 * Export project as ZIP file (creates downloadable archive)
 */
export async function exportProjectAsZip(files: ProjectExport['files'], projectName: string = 'project'): Promise<void> {
  try {
    // For now, we'll create a simple text file with file contents
    // In a full implementation, you'd use JSZip library
    let zipContent = `# ${projectName} - Exported Files\n\n`;
    
    files.forEach(file => {
      if (!file.isFolder) {
        zipContent += `\n## ${file.path}\n`;
        zipContent += `\`\`\`${file.language}\n`;
        zipContent += file.content;
        zipContent += `\n\`\`\`\n`;
      }
    });
    
    const blob = new Blob([zipContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `${projectName}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success('Project exported as text file!');
  } catch (error) {
    console.error('ZIP export failed:', error);
    toast.error('Failed to export project as ZIP');
  }
}

/**
 * Import project from JSON file
 */
export function importProject(file: File): Promise<ProjectExport> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const projectData = JSON.parse(content) as ProjectExport;
        
        // Validate structure
        if (!projectData.version || !projectData.files || !Array.isArray(projectData.files)) {
          throw new Error('Invalid project file format');
        }
        
        toast.success(`Imported project: ${projectData.name}`);
        resolve(projectData);
      } catch (error) {
        console.error('Import failed:', error);
        toast.error('Failed to import project - invalid format');
        reject(error);
      }
    };
    
    reader.onerror = () => {
      toast.error('Failed to read file');
      reject(new Error('File read error'));
    };
    
    reader.readAsText(file);
  });
}

/**
 * Export individual file
 */
export function exportFile(fileName: string, content: string): void {
  try {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    toast.success(`Exported ${fileName}`);
  } catch (error) {
    console.error('File export failed:', error);
    toast.error('Failed to export file');
  }
}

/**
 * Copy project to clipboard as JSON
 */
export async function copyProjectToClipboard(files: ProjectExport['files'], projectName: string = 'project'): Promise<void> {
  try {
    const exportData: ProjectExport = {
      version: '1.0.0',
      name: projectName,
      exportDate: new Date().toISOString(),
      files: files,
    };
    
    const jsonString = JSON.stringify(exportData, null, 2);
    await navigator.clipboard.writeText(jsonString);
    
    toast.success('Project copied to clipboard!');
  } catch (error) {
    console.error('Copy failed:', error);
    toast.error('Failed to copy to clipboard');
  }
}

/**
 * Import project from clipboard
 */
export async function importFromClipboard(): Promise<ProjectExport> {
  try {
    const text = await navigator.clipboard.readText();
    const projectData = JSON.parse(text) as ProjectExport;
    
    // Validate structure
    if (!projectData.version || !projectData.files || !Array.isArray(projectData.files)) {
      throw new Error('Invalid project format in clipboard');
    }
    
    toast.success(`Imported project: ${projectData.name}`);
    return projectData;
  } catch (error) {
    console.error('Clipboard import failed:', error);
    toast.error('Failed to import from clipboard');
    throw error;
  }
}
