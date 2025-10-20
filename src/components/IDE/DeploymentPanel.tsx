import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Rocket, CheckCircle2, AlertCircle, ExternalLink, Copy } from 'lucide-react';
import { toast } from 'sonner';
import {
  DeploymentConfig,
  DeploymentStatus,
  generateDeploymentCommand,
  getDeploymentChecklist,
  simulateDeployment,
  prepareForDeployment,
  generateEnvTemplate,
} from '@/lib/deployment';

export function DeploymentPanel() {
  const [platform, setPlatform] = useState<'vercel' | 'netlify'>('vercel');
  const [projectName, setProjectName] = useState('');
  const [deploymentStatus, setDeploymentStatus] = useState<DeploymentStatus | null>(null);
  const [isDeploying, setIsDeploying] = useState(false);

  const handleDeploy = async () => {
    if (!projectName.trim()) {
      toast.error('Please enter a project name');
      return;
    }

    setIsDeploying(true);
    setDeploymentStatus(null);

    try {
      const config: DeploymentConfig = {
        platform,
        projectName: projectName.trim(),
        branch: 'main',
      };

      // Prepare for deployment
      const preparation = await prepareForDeployment();
      if (!preparation.success) {
        toast.error(preparation.message);
        return;
      }

      // Simulate deployment
      await simulateDeployment(config, (status) => {
        setDeploymentStatus(status);
      });

      toast.success('Deployment completed successfully!');
    } catch (error) {
      toast.error('Deployment failed');
      console.error(error);
      setDeploymentStatus({
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsDeploying(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard');
  };

  const deploymentCommand = projectName.trim()
    ? generateDeploymentCommand({ platform, projectName: projectName.trim() })
    : '';

  const checklist = getDeploymentChecklist(platform);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Rocket className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold">Deploy Project</h2>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4 max-w-3xl">
          {/* Platform Selection */}
          <Tabs value={platform} onValueChange={(v) => setPlatform(v as 'vercel' | 'netlify')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="vercel">Vercel</TabsTrigger>
              <TabsTrigger value="netlify">Netlify</TabsTrigger>
            </TabsList>

            <TabsContent value="vercel" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Deploy to Vercel</CardTitle>
                  <CardDescription className="text-xs">
                    Deploy your project to Vercel's global edge network
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name">Project Name</Label>
                    <Input
                      id="project-name"
                      placeholder="my-sparkcraft-project"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      disabled={isDeploying}
                    />
                  </div>

                  <Button
                    onClick={handleDeploy}
                    disabled={isDeploying || !projectName.trim()}
                    className="w-full"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    {isDeploying ? 'Deploying...' : 'Deploy to Vercel'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="netlify" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Deploy to Netlify</CardTitle>
                  <CardDescription className="text-xs">
                    Deploy your project to Netlify's platform
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="project-name-netlify">Project Name</Label>
                    <Input
                      id="project-name-netlify"
                      placeholder="my-sparkcraft-project"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      disabled={isDeploying}
                    />
                  </div>

                  <Button
                    onClick={handleDeploy}
                    disabled={isDeploying || !projectName.trim()}
                    className="w-full"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    {isDeploying ? 'Deploying...' : 'Deploy to Netlify'}
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Deployment Status */}
          {deploymentStatus && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center gap-2">
                  {deploymentStatus.status === 'ready' && (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      Deployment Successful
                    </>
                  )}
                  {deploymentStatus.status === 'error' && (
                    <>
                      <AlertCircle className="w-4 h-4 text-red-500" />
                      Deployment Failed
                    </>
                  )}
                  {(deploymentStatus.status === 'building' || deploymentStatus.status === 'pending') && (
                    <>
                      <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      {deploymentStatus.status === 'building' ? 'Building...' : 'Pending...'}
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {deploymentStatus.url && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs flex-1">
                      {deploymentStatus.url}
                    </Badge>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => window.open(deploymentStatus.url, '_blank')}
                    >
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                {deploymentStatus.buildLogs && deploymentStatus.buildLogs.length > 0 && (
                  <div className="bg-muted p-2 rounded text-xs font-mono">
                    {deploymentStatus.buildLogs.map((log, i) => (
                      <div key={i}>{log}</div>
                    ))}
                  </div>
                )}
                {deploymentStatus.error && (
                  <Alert variant="destructive">
                    <AlertDescription>{deploymentStatus.error}</AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          )}

          {/* CLI Command */}
          {deploymentCommand && (
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">CLI Deployment</CardTitle>
                <CardDescription className="text-xs">
                  Deploy using the command line
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-muted p-2 rounded text-xs">
                    {deploymentCommand}
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(deploymentCommand)}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Environment Variables */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Environment Variables</CardTitle>
              <CardDescription className="text-xs">
                Required environment variables for deployment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <pre className="flex-1 bg-muted p-3 rounded text-xs overflow-x-auto">
                  {generateEnvTemplate()}
                </pre>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(generateEnvTemplate())}
                >
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Deployment Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">Deployment Checklist</CardTitle>
              <CardDescription className="text-xs">
                Follow these steps to deploy successfully
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2 text-sm">
                {checklist.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-muted-foreground">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          {/* Info Alert */}
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-xs">
              <strong>Note:</strong> This is a deployment guide interface. For actual deployment,
              you'll need to export your project and use the respective platform's CLI or dashboard.
              Configuration files (vercel.json, netlify.toml) are already included in your project.
            </AlertDescription>
          </Alert>
        </div>
      </ScrollArea>
    </div>
  );
}
