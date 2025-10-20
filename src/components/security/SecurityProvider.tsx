import { createContext, useContext, ReactNode } from 'react';
import { aiRequestLimiter, fileOperationLimiter } from '@/lib/security/rateLimit';
import { isValidFileName, isValidPath, sanitizeCodeContent, sanitizeAIPrompt } from '@/lib/security/validation';
import { toast } from 'sonner';

interface SecurityContextType {
  validateFileName: (fileName: string) => boolean;
  validatePath: (path: string) => boolean;
  sanitizeCode: (content: string) => string;
  sanitizePrompt: (prompt: string) => string;
  checkAIRateLimit: (userId: string) => boolean;
  checkFileOperationRateLimit: (userId: string) => boolean;
}

const SecurityContext = createContext<SecurityContextType | null>(null);

export function useSecurityhook() {
  const context = useContext(SecurityContext);
  if (!context) {
    throw new Error('useSecurity must be used within SecurityProvider');
  }
  return context;
}

interface SecurityProviderProps {
  children: ReactNode;
}

export function SecurityProvider({ children }: SecurityProviderProps) {
  const validateFileName = (fileName: string): boolean => {
    const valid = isValidFileName(fileName);
    if (!valid) {
      toast.error('Invalid file name. Please use only alphanumeric characters, hyphens, and underscores.');
    }
    return valid;
  };

  const validatePath = (path: string): boolean => {
    const valid = isValidPath(path);
    if (!valid) {
      toast.error('Invalid file path. Path traversal is not allowed.');
    }
    return valid;
  };

  const sanitizeCode = (content: string): string => {
    return sanitizeCodeContent(content);
  };

  const sanitizePrompt = (prompt: string): string => {
    return sanitizeAIPrompt(prompt);
  };

  const checkAIRateLimit = (userId: string): boolean => {
    const result = aiRequestLimiter.check(userId);
    if (!result.allowed) {
      const resetInSeconds = Math.ceil((result.resetTime - Date.now()) / 1000);
      toast.error(`Rate limit exceeded. Please wait ${resetInSeconds} seconds before making another AI request.`);
      return false;
    }
    return true;
  };

  const checkFileOperationRateLimit = (userId: string): boolean => {
    const result = fileOperationLimiter.check(userId);
    if (!result.allowed) {
      const resetInSeconds = Math.ceil((result.resetTime - Date.now()) / 1000);
      toast.error(`Too many file operations. Please wait ${resetInSeconds} seconds.`);
      return false;
    }
    return true;
  };

  const value: SecurityContextType = {
    validateFileName,
    validatePath,
    sanitizeCode,
    sanitizePrompt,
    checkAIRateLimit,
    checkFileOperationRateLimit,
  };

  return (
    <SecurityContext.Provider value={value}>
      {children}
    </SecurityContext.Provider>
  );
}
