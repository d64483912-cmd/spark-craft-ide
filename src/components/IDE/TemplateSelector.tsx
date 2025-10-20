import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { projectTemplates, ProjectTemplate } from '@/lib/templates';
import { FileCode, Layout, Sparkles, CheckCircle2 } from 'lucide-react';

interface TemplateSelectorProps {
  onSelectTemplate: (template: ProjectTemplate) => void;
}

export function TemplateSelector({ onSelectTemplate }: TemplateSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ProjectTemplate['category']>('web');

  const categories = [
    { value: 'web' as const, label: 'Web', icon: Layout },
    { value: 'react' as const, label: 'React', icon: FileCode },
    { value: 'vue' as const, label: 'Vue', icon: FileCode },
    { value: 'vanilla' as const, label: 'Vanilla', icon: Sparkles },
    { value: 'other' as const, label: 'Other', icon: FileCode },
  ];

  const handleSelectTemplate = (template: ProjectTemplate) => {
    onSelectTemplate(template);
    setOpen(false);
  };

  const filteredTemplates = projectTemplates.filter(
    (template) => template.category === selectedCategory
  );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Sparkles className="mr-2 h-4 w-4" />
          New from Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create from Template</DialogTitle>
          <DialogDescription>
            Choose a template to quickly start your project
          </DialogDescription>
        </DialogHeader>

        <Tabs value={selectedCategory} onValueChange={(val) => setSelectedCategory(val as ProjectTemplate['category'])}>
          <TabsList className="grid w-full" style={{ gridTemplateColumns: `repeat(${categories.length}, 1fr)` }}>
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <TabsTrigger key={category.value} value={category.value}>
                  <Icon className="mr-2 h-4 w-4" />
                  {category.label}
                </TabsTrigger>
              );
            })}
          </TabsList>

          {categories.map((category) => (
            <TabsContent key={category.value} value={category.value} className="mt-4">
              {filteredTemplates.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <p>No templates available in this category yet.</p>
                  <p className="text-sm mt-2">Check back soon for more templates!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredTemplates.map((template) => (
                    <Card
                      key={template.id}
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() => handleSelectTemplate(template)}
                    >
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <span className="text-2xl">{template.icon}</span>
                          {template.name}
                        </CardTitle>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="text-sm font-medium">Includes:</div>
                          <ul className="text-sm text-muted-foreground space-y-1">
                            {template.files.slice(0, 4).map((file) => (
                              <li key={file.path} className="flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                {file.name}
                              </li>
                            ))}
                            {template.files.length > 4 && (
                              <li className="text-xs italic">
                                +{template.files.length - 4} more files
                              </li>
                            )}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
