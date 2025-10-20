import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { RealtimeChannel } from '@supabase/supabase-js';

export interface CollaboratorPresence {
  user_id: string;
  username: string;
  cursor_position?: { line: number; column: number };
  active_file?: string;
  last_seen: string;
}

export interface FileChangeEvent {
  file_path: string;
  content: string;
  user_id: string;
  timestamp: string;
}

interface UseRealtimeCollaborationProps {
  projectId: string | null;
  userId: string;
  username: string;
  onFileChange?: (event: FileChangeEvent) => void;
  onPresenceUpdate?: (collaborators: CollaboratorPresence[]) => void;
}

export function useRealtimeCollaboration({
  projectId,
  userId,
  username,
  onFileChange,
  onPresenceUpdate,
}: UseRealtimeCollaborationProps) {
  const [channel, setChannel] = useState<RealtimeChannel | null>(null);
  const [collaborators, setCollaborators] = useState<CollaboratorPresence[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize channel and presence
  useEffect(() => {
    if (!projectId) return;

    const channelName = `project:${projectId}`;
    const realtimeChannel = supabase.channel(channelName, {
      config: {
        presence: {
          key: userId,
        },
      },
    });

    // Track presence
    realtimeChannel
      .on('presence', { event: 'sync' }, () => {
        const state = realtimeChannel.presenceState();
        const users: CollaboratorPresence[] = [];
        
        Object.keys(state).forEach((key) => {
          const presences = state[key] as unknown as CollaboratorPresence[];
          if (presences && presences.length > 0) {
            users.push(presences[0]);
          }
        });
        
        setCollaborators(users);
        onPresenceUpdate?.(users);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        console.log('User joined:', newPresences);
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        console.log('User left:', leftPresences);
      });

    // Track file changes
    realtimeChannel.on(
      'broadcast',
      { event: 'file_change' },
      (payload) => {
        const event = payload.payload as FileChangeEvent;
        if (event.user_id !== userId) {
          onFileChange?.(event);
        }
      }
    );

    // Subscribe to channel
    realtimeChannel
      .subscribe(async (status) => {
        if (status === 'SUBSCRIBED') {
          setIsConnected(true);
          // Send initial presence
          await realtimeChannel.track({
            user_id: userId,
            username: username,
            last_seen: new Date().toISOString(),
          });
        }
      });

    setChannel(realtimeChannel);

    // Cleanup
    return () => {
      realtimeChannel.unsubscribe();
      setIsConnected(false);
    };
  }, [projectId, userId, username, onFileChange, onPresenceUpdate]);

  // Broadcast file changes
  const broadcastFileChange = useCallback(
    async (filePath: string, content: string) => {
      if (!channel || !isConnected) return;

      const event: FileChangeEvent = {
        file_path: filePath,
        content,
        user_id: userId,
        timestamp: new Date().toISOString(),
      };

      await channel.send({
        type: 'broadcast',
        event: 'file_change',
        payload: event,
      });
    },
    [channel, isConnected, userId]
  );

  // Update cursor position
  const updateCursorPosition = useCallback(
    async (line: number, column: number, activeFile: string) => {
      if (!channel || !isConnected) return;

      await channel.track({
        user_id: userId,
        username: username,
        cursor_position: { line, column },
        active_file: activeFile,
        last_seen: new Date().toISOString(),
      });
    },
    [channel, isConnected, userId, username]
  );

  return {
    isConnected,
    collaborators,
    broadcastFileChange,
    updateCursorPosition,
  };
}
