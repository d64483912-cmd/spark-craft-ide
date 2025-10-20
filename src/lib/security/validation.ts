/**
 * Security validation utilities
 */

// File name validation
export function isValidFileName(fileName: string): boolean {
  // Check for null traversal attempts
  if (fileName.includes('..') || fileName.includes('//')) {
    return false;
  }

  // Check for reserved names (Windows)
  const reservedNames = ['CON', 'PRN', 'AUX', 'NUL', 'COM1', 'COM2', 'COM3', 'COM4', 'LPT1', 'LPT2'];
  const baseName = fileName.split('.')[0].toUpperCase();
  if (reservedNames.includes(baseName)) {
    return false;
  }

  // Check for invalid characters
  const invalidChars = /[<>:"|?*\x00-\x1f]/;
  if (invalidChars.test(fileName)) {
    return false;
  }

  // Check length
  if (fileName.length === 0 || fileName.length > 255) {
    return false;
  }

  return true;
}

// Path validation
export function isValidPath(path: string): boolean {
  // Must start with /
  if (!path.startsWith('/')) {
    return false;
  }

  // No path traversal
  if (path.includes('..')) {
    return false;
  }

  // Check each component
  const components = path.split('/').filter(c => c.length > 0);
  for (const component of components) {
    if (!isValidFileName(component)) {
      return false;
    }
  }

  return true;
}

// Code content sanitization
export function sanitizeCodeContent(content: string): string {
  // Remove any potential XSS attempts if content is displayed as HTML
  // For now, we just ensure it's a valid string
  if (typeof content !== 'string') {
    return '';
  }

  // Limit size to prevent memory issues (10MB)
  const maxSize = 10 * 1024 * 1024;
  if (content.length > maxSize) {
    return content.substring(0, maxSize);
  }

  return content;
}

// Project name validation
export function isValidProjectName(name: string): boolean {
  // Check length
  if (name.length === 0 || name.length > 100) {
    return false;
  }

  // Only alphanumeric, hyphens, and underscores
  const validPattern = /^[a-zA-Z0-9-_]+$/;
  if (!validPattern.test(name)) {
    return false;
  }

  return true;
}

// AI prompt validation
export function sanitizeAIPrompt(prompt: string): string {
  if (typeof prompt !== 'string') {
    return '';
  }

  // Limit prompt length (10k characters)
  const maxLength = 10000;
  if (prompt.length > maxLength) {
    return prompt.substring(0, maxLength);
  }

  // Remove any control characters
  return prompt.replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, '');
}

// URL validation for external resources
export function isValidExternalURL(url: string): boolean {
  try {
    const parsedUrl = new URL(url);
    
    // Only allow https
    if (parsedUrl.protocol !== 'https:') {
      return false;
    }

    // Prevent SSRF to internal networks
    const hostname = parsedUrl.hostname.toLowerCase();
    const internalHosts = ['localhost', '127.0.0.1', '0.0.0.0', '::1'];
    if (internalHosts.some(h => hostname.includes(h))) {
      return false;
    }

    // Block private IP ranges
    if (/^(10|172\.(1[6-9]|2[0-9]|3[01])|192\.168)\./.test(hostname)) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}

// Content Security Policy headers
export const CSP_HEADERS = {
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // unsafe-eval needed for Monaco Editor
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
    "frame-src 'self' blob:",
    "worker-src 'self' blob:",
  ].join('; '),
};

// Validate JSON structure
export function isValidJSON(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

// Sanitize error messages (don't leak sensitive info)
export function sanitizeErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    // Remove potential file paths or sensitive info
    return error.message.replace(/\/[^\s]*/g, '[path]');
  }
  return 'An error occurred';
}
