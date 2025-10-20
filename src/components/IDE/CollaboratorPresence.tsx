import { CollaboratorPresence as CollaboratorType } from '@/hooks/useRealtimeCollaboration';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';

interface CollaboratorPresenceProps {
  collaborators: CollaboratorType[];
  isConnected: boolean;
}

export function CollaboratorPresence({ collaborators, isConnected }: CollaboratorPresenceProps) {
  // Get initials from username
  const getInitials = (username: string) => {
    return username
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Generate color from user_id
  const getColor = (userId: string) => {
    const colors = [
      'bg-red-500',
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
      'bg-orange-500',
    ];
    const index = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  if (!isConnected) {
    return (
      <div className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground">
        <div className="w-2 h-2 rounded-full bg-gray-400" />
        <span>Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2">
      <div className="flex items-center gap-1">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <Badge variant="secondary" className="text-xs">
          <Users className="w-3 h-3 mr-1" />
          {collaborators.length}
        </Badge>
      </div>

      <TooltipProvider>
        <div className="flex -space-x-2">
          {collaborators.slice(0, 5).map((collaborator) => (
            <Tooltip key={collaborator.user_id}>
              <TooltipTrigger>
                <Avatar className={`w-8 h-8 border-2 border-background ${getColor(collaborator.user_id)}`}>
                  <AvatarFallback className="text-white text-xs">
                    {getInitials(collaborator.username)}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  <p className="font-medium">{collaborator.username}</p>
                  {collaborator.active_file && (
                    <p className="text-muted-foreground">
                      Editing: {collaborator.active_file}
                    </p>
                  )}
                  {collaborator.cursor_position && (
                    <p className="text-muted-foreground">
                      Line {collaborator.cursor_position.line}:{collaborator.cursor_position.column}
                    </p>
                  )}
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
          {collaborators.length > 5 && (
            <Tooltip>
              <TooltipTrigger>
                <Avatar className="w-8 h-8 border-2 border-background bg-gray-500">
                  <AvatarFallback className="text-white text-xs">
                    +{collaborators.length - 5}
                  </AvatarFallback>
                </Avatar>
              </TooltipTrigger>
              <TooltipContent>
                <div className="text-xs">
                  {collaborators.slice(5).map(c => (
                    <p key={c.user_id}>{c.username}</p>
                  ))}
                </div>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    </div>
  );
}
