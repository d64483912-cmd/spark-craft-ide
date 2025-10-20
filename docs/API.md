# SparkCraft IDE - API Documentation

## Table of Contents
- [Overview](#overview)
- [Authentication](#authentication)
- [AI Code Generation API](#ai-code-generation-api)
- [Database API](#database-api)
- [WebContainer API](#webcontainer-api)
- [Error Handling](#error-handling)
- [Rate Limits](#rate-limits)

---

## Overview

SparkCraft IDE provides several APIs for code generation, project management, and runtime execution.

**Base URLs:**
- AI API: `https://bnjthwrpigvchbhsmfec.supabase.co/functions/v1`
- Database: `https://bnjthwrpigvchbhsmfec.supabase.co`

---

## Authentication

### Supabase Auth

SparkCraft uses Supabase for authentication and authorization.

**Headers:**
```
Authorization: Bearer <your-jwt-token>
apikey: <supabase-anon-key>
```

**Getting Started:**
```typescript
import { supabase } from '@/integrations/supabase/client';

// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure-password'
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure-password'
});

// Get current user
const { data: { user } } = await supabase.auth.getUser();
```

---

## AI Code Generation API

### Generate Code

Generate code from natural language descriptions using AI.

**Endpoint:** `POST /functions/v1/generate-code`

**Headers:**
```
Content-Type: application/json
```

**Request Body:**
```typescript
{
  messages: Array<{
    role: 'user' | 'assistant';
    content: string;
  }>;
  projectContext?: {
    files: Array<{
      name: string;
      path: string;
    }>;
  };
}
```

**Example Request:**
```typescript
const response = await fetch(
  'https://bnjthwrpigvchbhsmfec.supabase.co/functions/v1/generate-code',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      messages: [
        { role: 'user', content: 'Create a React counter component' }
      ],
      projectContext: {
        files: [
          { name: 'package.json', path: '/package.json' }
        ]
      }
    }),
  }
);
```

**Response Format:**

The API returns Server-Sent Events (SSE) stream:

```
data: {"choices":[{"delta":{"content":"Here's"}}]}
data: {"choices":[{"delta":{"content":" a"}}]}
data: {"choices":[{"delta":{"content":" React"}}]}
...
data: [DONE]
```

**Parsing Stream:**
```typescript
const reader = response.body.getReader();
const decoder = new TextDecoder();

while (true) {
  const { done, value } = await reader.read();
  if (done) break;

  const chunk = decoder.decode(value);
  const lines = chunk.split('\n');

  for (const line of lines) {
    if (line.startsWith('data: ')) {
      const data = line.slice(6);
      if (data === '[DONE]') continue;
      
      const parsed = JSON.parse(data);
      const content = parsed.choices?.[0]?.delta?.content;
      if (content) {
        // Handle content
      }
    }
  }
}
```

**AI Model:**
- Model: `google/gemini-2.5-flash`
- Context Window: 32k tokens
- Streaming: Yes

**System Prompt:**
The AI is prompted to:
- Generate complete, working code snippets
- Use modern best practices
- Include necessary imports
- Add helpful comments
- Consider existing project structure
- Format responses with code blocks

---

## Database API

### Projects

#### List Projects
```typescript
const { data, error } = await supabase
  .from('projects')
  .select('*')
  .eq('user_id', userId);
```

#### Create Project
```typescript
const { data, error } = await supabase
  .from('projects')
  .insert({
    name: 'My New Project',
    description: 'Project description',
    user_id: userId
  })
  .select()
  .single();
```

#### Update Project
```typescript
const { data, error } = await supabase
  .from('projects')
  .update({
    name: 'Updated Name',
    description: 'Updated description'
  })
  .eq('id', projectId);
```

#### Delete Project
```typescript
const { data, error } = await supabase
  .from('projects')
  .delete()
  .eq('id', projectId);
```

### Project Files

#### List Files
```typescript
const { data, error } = await supabase
  .from('project_files')
  .select('*')
  .eq('project_id', projectId);
```

#### Create File
```typescript
const { data, error } = await supabase
  .from('project_files')
  .insert({
    project_id: projectId,
    name: 'index.html',
    path: '/index.html',
    content: '<html>...</html>',
    language: 'html'
  })
  .select()
  .single();
```

#### Update File
```typescript
const { data, error } = await supabase
  .from('project_files')
  .update({
    content: updatedContent
  })
  .eq('id', fileId);
```

#### Delete File
```typescript
const { data, error } = await supabase
  .from('project_files')
  .delete()
  .eq('id', fileId);
```

### Chat Messages

#### List Messages
```typescript
const { data, error } = await supabase
  .from('chat_messages')
  .select('*')
  .eq('project_id', projectId)
  .order('created_at', { ascending: true });
```

#### Create Message
```typescript
const { data, error } = await supabase
  .from('chat_messages')
  .insert({
    project_id: projectId,
    role: 'user',
    content: 'User message'
  })
  .select()
  .single();
```

---

## WebContainer API

### Overview

WebContainer provides a Node.js runtime in the browser.

### Custom Hook: `useWebContainer`

```typescript
import { useWebContainer } from '@/hooks/useWebContainer';

function MyComponent() {
  const {
    webContainer,      // WebContainer instance
    isBooting,         // Booting status
    isRunning,         // Server running status
    url,               // Server URL
    logs,              // Console logs
    syncFiles,         // Sync files to container
    installDependencies, // Run npm install
    startDevServer,    // Start npm run dev
    stopDevServer,     // Stop server
  } = useWebContainer();
}
```

### Methods

#### syncFiles
Sync files to WebContainer filesystem.

```typescript
await syncFiles([
  {
    name: 'index.js',
    path: '/index.js',
    content: 'console.log("Hello");',
    language: 'javascript'
  }
]);
```

#### installDependencies
Install npm packages.

```typescript
await installDependencies();
// Runs: npm install
```

#### startDevServer
Start development server.

```typescript
await startDevServer();
// Runs: npm run dev
```

#### stopDevServer
Stop the running server.

```typescript
stopDevServer();
```

### File Tree Format

WebContainer expects files in this format:

```typescript
{
  'package.json': {
    file: {
      contents: '{"name": "my-app", ...}'
    }
  },
  'index.js': {
    file: {
      contents: 'console.log("Hello");'
    }
  },
  'src': {
    directory: {
      'App.jsx': {
        file: {
          contents: 'export default function App() {...}'
        }
      }
    }
  }
}
```

### Events

Listen to WebContainer events:

```typescript
webContainer.on('server-ready', (port, url) => {
  console.log(`Server running at ${url}`);
});

webContainer.on('error', (error) => {
  console.error('WebContainer error:', error);
});
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Description |
|------|---------|-------------|
| 200 | OK | Request successful |
| 400 | Bad Request | Invalid request format |
| 401 | Unauthorized | Authentication required |
| 402 | Payment Required | Credits exhausted |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Resource not found |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server error |

### Error Response Format

```typescript
{
  error: string;           // Error message
  details?: any;           // Additional details
  code?: string;           // Error code
}
```

### Example Error Handling

```typescript
try {
  const response = await fetch('/api/endpoint');
  
  if (!response.ok) {
    const error = await response.json();
    
    switch (response.status) {
      case 429:
        toast.error('Rate limit exceeded. Please try again later.');
        break;
      case 402:
        toast.error('Please add credits to continue.');
        break;
      default:
        toast.error(error.error || 'An error occurred');
    }
    return;
  }
  
  // Handle success
} catch (error) {
  console.error('Request failed:', error);
  toast.error('Network error. Please check your connection.');
}
```

---

## Rate Limits

### AI API

- **Limit:** Based on Lovable workspace credits
- **Response:** 429 status code when exceeded
- **Reset:** Depends on workspace plan

### Database API

- **Limit:** Supabase free tier limits
  - 500 MB database size
  - 2 GB bandwidth per month
  - 50,000 monthly active users

### Best Practices

1. **Implement Retry Logic**
   ```typescript
   async function retryRequest(fn, maxRetries = 3) {
     for (let i = 0; i < maxRetries; i++) {
       try {
         return await fn();
       } catch (error) {
         if (i === maxRetries - 1) throw error;
         await new Promise(r => setTimeout(r, 1000 * (i + 1)));
       }
     }
   }
   ```

2. **Cache Responses**
   ```typescript
   const cache = new Map();
   
   function getCached(key) {
     return cache.get(key);
   }
   
   function setCache(key, value, ttl = 60000) {
     cache.set(key, value);
     setTimeout(() => cache.delete(key), ttl);
   }
   ```

3. **Debounce AI Requests**
   ```typescript
   import { useDebounce } from '@/hooks/useDebounce';
   
   const debouncedInput = useDebounce(input, 500);
   ```

---

## SDK Examples

### Complete Project Workflow

```typescript
import { supabase } from '@/integrations/supabase/client';
import { useWebContainer } from '@/hooks/useWebContainer';

// 1. Create a new project
const { data: project } = await supabase
  .from('projects')
  .insert({
    name: 'My App',
    user_id: userId
  })
  .select()
  .single();

// 2. Generate code with AI
const response = await fetch('/functions/v1/generate-code', {
  method: 'POST',
  body: JSON.stringify({
    messages: [
      { role: 'user', content: 'Create a React app' }
    ]
  })
});

// 3. Save files to database
const { data: file } = await supabase
  .from('project_files')
  .insert({
    project_id: project.id,
    name: 'App.jsx',
    path: '/src/App.jsx',
    content: generatedCode,
    language: 'javascript'
  })
  .select()
  .single();

// 4. Run in WebContainer
const { syncFiles, installDependencies, startDevServer } = useWebContainer();

await syncFiles(files);
await installDependencies();
await startDevServer();
```

---

## Webhooks (Future)

*Coming Soon*

Webhooks will allow you to receive real-time notifications for:
- Project updates
- File changes
- AI generation completion
- Build status changes

---

## Support

For API support:
- **Documentation**: [https://docs.sparkcraft.dev](https://docs.sparkcraft.dev)
- **GitHub Issues**: [https://github.com/d64483912-cmd/spark-craft-ide/issues](https://github.com/d64483912-cmd/spark-craft-ide/issues)
- **Email**: api-support@sparkcraft.dev

---

**Last Updated:** October 2024  
**API Version:** 1.0.0
