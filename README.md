# SparkCraft IDE 🚀

A comprehensive **Bolt.new replica** - an AI-powered web development platform that enables you to build, edit, and run full-stack applications in real-time directly in your browser.

![SparkCraft IDE](https://img.shields.io/badge/Version-1.0.0-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![React](https://img.shields.io/badge/React-18.3.1-61DAFB?logo=react) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-3178C6?logo=typescript)

## ✨ Features

### Core Functionality
- **🤖 AI-Powered Code Generation**: Natural language to code using Gemini 2.5 Flash
- **📝 Monaco Editor**: Full-featured VS Code editor with syntax highlighting
- **👁️ Live Preview**: Real-time HTML/CSS/JS preview with hot reloading
- **🗂️ File Management**: Complete file tree with create, edit, delete operations
- **⚡ WebContainer Support**: Run Node.js applications directly in the browser
- **💬 Chat Interface**: Conversational AI assistant for iterative development
- **📦 Package Management**: Automatic npm/yarn dependency installation
- **🎨 Modern UI**: Clean, dark-themed interface inspired by Bolt.new

### Technical Highlights
- **Split View**: Code editor and live preview side-by-side
- **Multi-Language Support**: HTML, CSS, JavaScript, TypeScript, React, and more
- **Auto-Detection**: Automatically detects project type and runtime requirements
- **Code Parsing**: Intelligent extraction of code blocks from AI responses
- **File Templates**: Smart default templates for common file types
- **Responsive Design**: Works on desktop and tablet devices

## 🏗️ Architecture

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **UI Components**: Radix UI + shadcn/ui
- **Styling**: Tailwind CSS
- **Code Editor**: Monaco Editor (VS Code)
- **State Management**: React hooks and context
- **Icons**: Lucide React

### Backend Services
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for implementation)
- **AI API**: Lovable AI Gateway (Gemini 2.5 Flash)
- **Functions**: Supabase Edge Functions (Deno)

### Runtime Environment
- **WebContainer API**: In-browser Node.js runtime
- **Sandboxing**: Secure code execution environment
- **Package Installation**: Native npm support

## 📁 Project Structure

```
spark-craft-ide/
├── src/
│   ├── components/
│   │   ├── IDE/
│   │   │   ├── ChatPanel.tsx       # AI chat interface
│   │   │   ├── CodeEditor.tsx      # Monaco editor wrapper
│   │   │   ├── FileTree.tsx        # File explorer
│   │   │   ├── IDELayout.tsx       # Main layout orchestrator
│   │   │   └── PreviewPanel.tsx    # Live preview with WebContainer
│   │   └── ui/                     # Reusable UI components
│   ├── hooks/
│   │   └── useWebContainer.ts      # WebContainer lifecycle manager
│   ├── integrations/
│   │   └── supabase/               # Supabase client & types
│   ├── lib/
│   │   └── utils.ts                # Utility functions
│   └── pages/
│       └── Index.tsx               # Main application page
├── supabase/
│   ├── functions/
│   │   └── generate-code/          # AI code generation endpoint
│   └── migrations/                 # Database schema
├── public/                         # Static assets
└── [config files]                  # Vite, TypeScript, Tailwind, ESLint

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/d64483912-cmd/spark-craft-ide.git
   cd spark-craft-ide
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   The project uses Supabase. Environment variables are already configured in `.env`:
   ```env
   VITE_SUPABASE_URL=https://bnjthwrpigvchbhsmfec.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=[your-key]
   VITE_SUPABASE_PROJECT_ID=bnjthwrpigvchbhsmfec
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:8080`

## 💻 Usage Guide

### Creating Your First Project

1. **Start with AI**
   - Open the chat panel on the left
   - Describe what you want to build, e.g.:
     ```
     Create a simple HTML page with a button that changes color when clicked
     ```

2. **AI Generates Code**
   - The AI will generate the code and display it in code blocks
   - Click "Create File" on any code block to add it to your project

3. **Edit & Preview**
   - Files appear in the file tree (middle panel)
   - Click a file to edit it in Monaco Editor
   - Switch to "Preview" or "Split" view to see live results

4. **Advanced Projects**
   - For React/Vite projects, AI can generate a complete `package.json`
   - WebContainer automatically detects and offers to run npm-based projects
   - Click "Run" to start the development server
   - View console logs in the "Console" tab

### File Management

#### Creating Files Manually
- Click the `+` button in the file tree
- Choose "File" or "Folder"
- Enter the name (e.g., `App.jsx`, `styles.css`)

#### Editing Files
- Click any file in the file tree to open it
- Monaco Editor provides:
  - Syntax highlighting
  - IntelliSense (code completion)
  - Error detection
  - Multiple cursors
  - Find & replace

#### Deleting Files
- Hover over a file in the tree
- Click the trash icon that appears

### WebContainer Features

For projects with `package.json`:

1. **Install Dependencies**
   ```
   Click "Install" button → npm install runs automatically
   ```

2. **Run Development Server**
   ```
   Click "Run" button → Starts npm run dev
   ```

3. **View Logs**
   ```
   Switch to "Console" tab to see build output and errors
   ```

4. **Open in New Tab**
   ```
   Click the external link icon to open preview in a separate window
   ```

## 🛠️ Development

### Project Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Build for development (with source maps)
npm run build:dev

# Run linter
npm run lint

# Preview production build
npm run preview
```

### Code Quality

The project uses:
- **ESLint**: For code linting
- **TypeScript**: For type safety
- **Prettier** (via editor): For code formatting

### Architecture Patterns

#### Component Structure
- **Presentational Components**: UI-only components in `src/components/ui/`
- **Container Components**: Business logic in `src/components/IDE/`
- **Custom Hooks**: Reusable logic in `src/hooks/`

#### State Management
- React `useState` for local state
- Props drilling for component communication
- Custom hooks for complex state logic (e.g., `useWebContainer`)

#### File Organization
- Group by feature (e.g., all IDE components together)
- Shared UI components in `ui` folder
- Keep related files close (component + styles + tests)

## 🔌 API Documentation

### AI Code Generation

**Endpoint**: `https://bnjthwrpigvchbhsmfec.supabase.co/functions/v1/generate-code`

**Method**: POST

**Request Body**:
```json
{
  "messages": [
    { "role": "user", "content": "Create a React counter component" },
    { "role": "assistant", "content": "..." }
  ],
  "projectContext": {
    "files": [
      { "name": "index.html", "path": "/index.html" }
    ]
  }
}
```

**Response**: Server-Sent Events (SSE) stream with JSON chunks

**Features**:
- Streaming responses for real-time feedback
- Context-aware generation based on existing files
- Automatic code block parsing
- Multi-language support

### Database Schema

#### Projects Table
```sql
projects {
  id: UUID PRIMARY KEY
  name: TEXT
  description: TEXT
  user_id: TEXT
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### Files Table
```sql
project_files {
  id: UUID PRIMARY KEY
  project_id: UUID (FK)
  name: TEXT
  path: TEXT
  content: TEXT
  language: TEXT
  created_at: TIMESTAMP
  updated_at: TIMESTAMP
}
```

#### Chat Messages Table
```sql
chat_messages {
  id: UUID PRIMARY KEY
  project_id: UUID (FK)
  role: TEXT ('user' | 'assistant')
  content: TEXT
  created_at: TIMESTAMP
}
```

## 🎨 Customization

### Theming

Theme variables are defined in `src/index.css`:

```css
:root {
  --background: 222 47% 7%;
  --foreground: 210 40% 98%;
  --primary: 199 89% 48%;
  --editor-bg: 222 47% 11%;
  --sidebar-bg: 222 47% 8%;
  /* ... more variables */
}
```

Modify these HSL values to customize colors.

### Adding New File Templates

Edit `src/components/IDE/IDELayout.tsx` → `getDefaultContent()`:

```typescript
const templates: Record<string, string> = {
  html: '<!DOCTYPE html>...',
  css: '/* Your custom CSS template */',
  // Add more templates
};
```

## 🔐 Security

### Current Implementation
- **Supabase RLS**: Row-level security on all tables
- **Sandboxed Execution**: WebContainer provides isolated runtime
- **CORS**: Configured for secure cross-origin requests

### Recommended Additions
- **Authentication**: Implement Supabase Auth
- **Rate Limiting**: Add to AI API endpoint
- **Input Validation**: Sanitize all user inputs
- **CSP Headers**: Content Security Policy for XSS protection

## 🐛 Known Issues & Limitations

1. **WebContainer Browser Support**
   - Requires browsers with SharedArrayBuffer support
   - Not available on iOS/Safari
   - Fallback to simple preview for unsupported browsers

2. **Large Files**
   - Monaco Editor may lag with files > 10,000 lines
   - Consider virtual scrolling for large projects

3. **Network Latency**
   - AI responses depend on network speed
   - Streaming helps, but initial connection may take time

## 🗺️ Roadmap

### Phase 1: MVP ✅ (Current)
- [x] AI-powered code generation
- [x] Monaco Editor integration
- [x] File management system
- [x] Live preview
- [x] WebContainer support

### Phase 2: Enhancement 🚧
- [ ] User authentication
- [x] Project save/load from database
- [x] Real-time collaboration (WebSocket)
- [x] Git integration
- [x] Deployment integration (Vercel, Netlify)

### Phase 3: Advanced Features 📋
- [x] Template library
- [ ] Code snippets
- [ ] Extension marketplace
- [x] Multi-user editing
- [x] Version history
- [ ] AI code review

## 🚀 Deployment

SparkCraft IDE can be deployed to major hosting platforms with zero configuration.

### Quick Deploy

#### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/d64483912-cmd/spark-craft-ide)

1. Click the button above
2. Connect your GitHub account
3. Add environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy!

#### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/d64483912-cmd/spark-craft-ide)

1. Click the button above
2. Connect your GitHub account
3. Add environment variables in site settings
4. Deploy!

### Manual Deployment

For detailed deployment instructions, including:
- CLI deployment steps
- Custom domain setup
- Environment variable configuration
- Troubleshooting guide
- Performance optimization

See the complete [Deployment Guide](docs/DEPLOYMENT.md)

### Configuration Files

The project includes pre-configured deployment files:
- `vercel.json` - Vercel platform configuration
- `netlify.toml` - Netlify platform configuration

Both files include:
- ✓ Optimized build settings
- ✓ Security headers
- ✓ SPA routing rules
- ✓ Asset caching policies

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Coding Guidelines
- Follow the existing code style
- Write meaningful commit messages
- Add comments for complex logic
- Update documentation for new features
- Ensure linting passes (`npm run lint`)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Bolt.new** by StackBlitz - Inspiration for the project
- **Monaco Editor** - Powered by Microsoft
- **WebContainer** - Browser-based Node.js by StackBlitz
- **Supabase** - Backend infrastructure
- **shadcn/ui** - Beautiful UI components
- **Lovable** - AI infrastructure

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/d64483912-cmd/spark-craft-ide/issues)
- **Discussions**: [GitHub Discussions](https://github.com/d64483912-cmd/spark-craft-ide/discussions)
- **Email**: [support@sparkcraft.dev](mailto:support@sparkcraft.dev)

## 🌟 Star History

If you find this project useful, please consider giving it a ⭐!

---

**Built with ❤️ by the SparkCraft Team**

[🌐 Website](https://sparkcraft.dev) • [📖 Documentation](https://docs.sparkcraft.dev) • [💬 Discord](https://discord.gg/sparkcraft)
