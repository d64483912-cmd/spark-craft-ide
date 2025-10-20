# SparkCraft IDE - User Guide

Welcome to SparkCraft IDE! This guide will help you get the most out of our AI-powered web development platform.

## Table of Contents
- [Getting Started](#getting-started)
- [Interface Overview](#interface-overview)
- [Working with AI](#working-with-ai)
- [File Management](#file-management)
- [Code Editing](#code-editing)
- [Live Preview](#live-preview)
- [WebContainer Projects](#webcontainer-projects)
- [Tips & Tricks](#tips--tricks)
- [Troubleshooting](#troubleshooting)

---

## Getting Started

### First Time Setup

1. **Open SparkCraft IDE**
   - Navigate to the application URL
   - You'll see the IDE interface with three main panels

2. **Understand the Layout**
   - **Left Panel**: AI Chat Assistant
   - **Middle Panel**: File Tree
   - **Right Panel**: Code Editor & Preview

### Your First Project

Let's create a simple website:

1. **Talk to the AI**
   ```
   You: Create a colorful landing page with a header, hero section, and footer
   ```

2. **Wait for AI Response**
   - The AI will generate HTML and CSS code
   - Code blocks will appear in the chat

3. **Create Files**
   - Click "Create File" button on each code block
   - Files will appear in the file tree

4. **View Your Project**
   - Click the "Preview" tab to see your website live
   - Changes update automatically!

---

## Interface Overview

### Chat Panel (Left)

The AI assistant is your coding partner.

**Features:**
- Natural language input
- Streaming responses
- Code block display
- One-click file creation
- Context-aware suggestions

**Example Prompts:**
```
✅ "Create a responsive navbar with dropdown menu"
✅ "Add a dark mode toggle to my site"
✅ "Build a todo list component in React"
✅ "Generate a package.json for a Vite project"
❌ "What's the weather today?" (not related to coding)
```

### File Tree (Middle)

Manage your project files here.

**Actions:**
- Click `+` to create new files/folders
- Click a file to open it
- Hover and click trash icon to delete
- Expand folders with the arrow icon

**Supported File Types:**
- HTML (`.html`)
- CSS (`.css`)
- JavaScript (`.js`, `.jsx`)
- TypeScript (`.ts`, `.tsx`)
- JSON (`.json`)
- Markdown (`.md`)

### Editor & Preview (Right)

Work with your code here.

**Three Modes:**
1. **Code** - Full-screen editor
2. **Preview** - Full-screen live preview
3. **Split** - Side-by-side editor and preview

**Switch modes** using the tabs at the top.

---

## Working with AI

### Effective Prompts

#### ✅ Good Prompts

```
"Create a responsive card component with image, title, and description"
```
- **Why**: Specific, actionable, clear output

```
"Add validation to the email input field"
```
- **Why**: References existing code, specific task

```
"Refactor this function to use async/await instead of promises"
```
- **Why**: Clear refactoring goal

#### ❌ Less Effective Prompts

```
"Make it better"
```
- **Why**: Too vague, no specific direction

```
"Create a website"
```
- **Why**: Too broad, needs more detail

```
"Fix the bug"
```
- **Why**: Doesn't specify which bug or where

### Multi-Turn Conversations

The AI remembers context! Have a conversation:

```
You: Create a button component
AI:  [generates button code]

You: Now make it have a loading state
AI:  [updates code with loading state]

You: Add a success animation when clicked
AI:  [adds animation code]
```

### Code Block Features

When the AI generates code, you'll see:

```
┌─────────────────────────────────────┐
│ 📄 index.html            html       │
│                      [Create File]  │
├─────────────────────────────────────┤
│ <!DOCTYPE html>                     │
│ <html>                              │
│   ...                               │
└─────────────────────────────────────┘
```

**Features:**
- File name detection
- Language syntax highlighting
- One-click file creation
- Copy to clipboard (hover over code)

### AI Capabilities

**What the AI Can Do:**
- ✅ Generate complete, working code
- ✅ Explain complex concepts
- ✅ Debug and fix errors
- ✅ Refactor existing code
- ✅ Suggest improvements
- ✅ Create multiple files at once
- ✅ Add features iteratively

**Limitations:**
- ❌ Can't access external APIs directly
- ❌ Can't run your local files
- ❌ Can't browse the internet
- ❌ May need guidance for very complex tasks

---

## File Management

### Creating Files

**Method 1: From AI**
1. Ask AI to generate code
2. Click "Create File" on code blocks
3. File appears in tree automatically

**Method 2: Manual Creation**
1. Click `+` button in file tree
2. Choose "File" or "Folder"
3. Enter name (e.g., `styles.css`)
4. Click "Create"

**Method 3: Quick Actions**
1. Click "New File" or "New Folder" buttons
2. Enter name
3. Press Enter

### File Naming Tips

```
✅ Good Names
- index.html
- App.jsx
- styles.css
- package.json

❌ Avoid
- file.txt (not descriptive)
- My File.js (spaces, capital letters)
- test123.html (unclear purpose)
```

### Organizing Files

**Best Practices:**

```
project/
├── index.html          # Main entry point
├── styles.css          # Global styles
├── script.js           # Main JavaScript
└── components/         # Reusable components
    ├── Header.jsx
    ├── Footer.jsx
    └── Card.jsx
```

### Deleting Files

1. **Hover** over the file in the tree
2. **Click** the trash icon that appears
3. **Confirm** deletion in the dialog

⚠️ **Warning**: Deletion is permanent!

---

## Code Editing

### Monaco Editor Features

SparkCraft uses Monaco Editor (the same as VS Code!).

#### Basic Editing

**Shortcuts:**
- `Ctrl/Cmd + S` - Save (auto-save is enabled)
- `Ctrl/Cmd + F` - Find
- `Ctrl/Cmd + H` - Find and Replace
- `Ctrl/Cmd + /` - Toggle comment
- `Ctrl/Cmd + Z` - Undo
- `Ctrl/Cmd + Shift + Z` - Redo

#### Advanced Features

**Multi-Cursor Editing**
- Hold `Alt` and click to add cursors
- `Ctrl/Cmd + Alt + Up/Down` - Add cursor above/below

**IntelliSense**
- Press `Ctrl + Space` for suggestions
- Auto-completes as you type

**Code Folding**
- Click the arrow icons in the gutter
- Collapse sections you're not working on

**Syntax Highlighting**
- Automatic based on file extension
- Supports all major languages

#### Customization

**Font Size**
- `Ctrl/Cmd + =` - Increase
- `Ctrl/Cmd + -` - Decrease
- `Ctrl/Cmd + 0` - Reset

**Theme**
- Currently: VS Dark theme
- Optimized for the IDE's dark UI

---

## Live Preview

### Simple Preview (HTML/CSS/JS)

For basic web pages:

1. **Automatic Detection**
   - SparkCraft auto-detects HTML files
   - Switches to simple preview mode

2. **Live Updates**
   - Changes reflect instantly
   - No refresh needed

3. **File Injection**
   - CSS automatically injected into `<head>`
   - JavaScript injected before `</body>`

**Example Workflow:**
```
1. Edit index.html
2. Switch to Preview tab
3. See changes immediately
4. Switch back to Code tab
5. Continue editing
```

### Preview Features

**Toolbar:**
- 🔄 **Refresh** - Manually reload preview
- 🔗 **External Link** - Open in new tab

**Sandbox Attributes:**
```
allow-scripts      // Run JavaScript
allow-same-origin  // Access localStorage
allow-forms        // Submit forms
allow-modals       // Open dialogs
```

### Debugging in Preview

**Use Browser DevTools:**
1. Right-click in preview
2. Select "Inspect Element"
3. Use Console, Network, Elements tabs

**Common Issues:**
```javascript
// Check console for errors
console.log('Debugging message');

// Alert for quick tests
alert('Button clicked!');
```

---

## WebContainer Projects

### What is WebContainer?

WebContainer runs **real Node.js** in your browser!

**Supports:**
- npm package installation
- Development servers (Vite, Next.js, etc.)
- Build tools
- Modern frameworks

### Creating a WebContainer Project

**Method 1: With AI**
```
You: Create a Vite React project with TypeScript
AI:  [generates package.json, vite.config.ts, etc.]
```

**Method 2: Manual**
1. Create `package.json` manually
2. WebContainer auto-detects it
3. Use "Install" and "Run" buttons

### WebContainer UI

When you have a `package.json`:

```
┌────────────────────────────────────┐
│ WebContainer Preview    [Running]  │
│ [Run] [Install] [Stop] [↗️]        │
├────────────────────────────────────┤
│                                    │
│  Tabs: [Preview] [Console]         │
│                                    │
│  Your app appears here...          │
│                                    │
└────────────────────────────────────┘
```

### Workflow

**Step 1: Install Dependencies**
```
Click "Install" → npm install runs
```

**Step 2: Start Dev Server**
```
Click "Run" → npm run dev starts
```

**Step 3: View Console**
```
Switch to "Console" tab for logs
```

**Step 4: Stop Server**
```
Click "Stop" when done
```

### Package.json Example

```json
{
  "name": "my-react-app",
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.2.0"
  }
}
```

### Supported Frameworks

✅ **Fully Supported:**
- Vite
- React
- Vue
- Svelte
- Vanilla JavaScript
- TypeScript

⚠️ **Partial Support:**
- Next.js (SSR limited)
- Nuxt (SSR limited)

❌ **Not Supported:**
- Native modules (C++ addons)
- File system operations
- Network servers (Express, etc.)

### Console Logs

The Console tab shows:
- npm install output
- Build logs
- Runtime errors
- console.log() output
- Warnings

**Filtering Logs:**
```
✅ Look for:
- "Server running at..."
- Build success messages

⚠️ Watch for:
- "Error:" messages
- "Warning:" messages
- Failed dependency installs
```

---

## Tips & Tricks

### Keyboard Shortcuts

| Action | Windows/Linux | Mac |
|--------|--------------|-----|
| Send Message | `Enter` | `Enter` |
| New Line in Chat | `Shift + Enter` | `Shift + Enter` |
| Save File | `Ctrl + S` | `Cmd + S` |
| Find | `Ctrl + F` | `Cmd + F` |
| Replace | `Ctrl + H` | `Cmd + H` |
| Comment | `Ctrl + /` | `Cmd + /` |
| Undo | `Ctrl + Z` | `Cmd + Z` |
| Redo | `Ctrl + Y` | `Cmd + Shift + Z` |

### Productivity Tips

1. **Use Split View**
   - Edit and preview simultaneously
   - Fastest way to iterate

2. **Ask for Explanations**
   ```
   "Explain what this code does"
   "Why did you use this approach?"
   ```

3. **Iterate Quickly**
   ```
   "Make it responsive"
   "Add animations"
   "Change color to blue"
   ```

4. **Save Context**
   - AI remembers your conversation
   - Build features incrementally

5. **File Templates**
   - Ask for boilerplate code
   - Example: "Create a React component template"

### Common Workflows

**Workflow 1: Quick HTML Page**
```
1. Ask AI: "Create a landing page"
2. Click "Create File" on HTML
3. Click "Create File" on CSS
4. Switch to Preview
5. Iterate: "Add a contact form"
```

**Workflow 2: React App**
```
1. Ask AI: "Create a Vite React setup"
2. Create all files from code blocks
3. Click "Install"
4. Click "Run"
5. View in Preview
6. Edit components
7. Hot reload automatically updates
```

**Workflow 3: Debug & Fix**
```
1. See error in preview/console
2. Ask AI: "Fix this error: [paste error]"
3. AI suggests solution
4. Apply fix
5. Test again
```

---

## Troubleshooting

### AI Not Responding

**Problem**: Chat is stuck on "Loading..."

**Solutions:**
1. Check internet connection
2. Refresh the page
3. Wait 10-15 seconds (model might be slow)
4. Try a simpler prompt

### Files Not Appearing

**Problem**: Clicked "Create File" but nothing happened

**Solutions:**
1. Check file tree (might be collapsed)
2. Look for duplicate file names
3. Refresh the page
4. Try creating manually

### Preview Not Updating

**Problem**: Changes don't appear in preview

**Solutions:**
1. Click the Refresh button (🔄)
2. Check for JavaScript errors (F12)
3. Make sure file is saved
4. Try switching tabs (Code → Preview)

### WebContainer Issues

**Problem**: "npm install" fails

**Solutions:**
1. Check package.json syntax
2. Verify package names are correct
3. Try smaller dependency list first
4. Check Console tab for specific errors

**Problem**: Server won't start

**Solutions:**
1. Ensure dependencies are installed first
2. Check if `dev` script exists in package.json
3. Look for port conflicts
4. Review Console for error messages

**Problem**: Browser not supported

**Solutions:**
- WebContainer requires:
  - Chrome 89+
  - Firefox 89+
  - Edge 89+
- Not supported:
  - Safari (iOS)
  - Internet Explorer

### Editor Issues

**Problem**: Code editor is laggy

**Solutions:**
1. Close unused tabs
2. Reduce file size (split large files)
3. Disable minimap (if available)
4. Refresh the page

**Problem**: IntelliSense not working

**Solutions:**
1. Wait a moment (loads on first use)
2. Press `Ctrl + Space` manually
3. Check file extension is correct
4. Restart the editor (refresh page)

### General Issues

**Problem**: App is slow/unresponsive

**Solutions:**
1. Close other browser tabs
2. Clear browser cache
3. Check RAM usage
4. Use Chrome/Edge (best performance)

**Problem**: Lost my work

**Prevention:**
- Files are auto-saved
- Use browser's back button carefully
- Consider implementing project save feature
- Keep important code in multiple files

---

## Best Practices

### Do's ✅

- **Be Specific** with AI prompts
- **Test Frequently** in preview
- **Organize Files** logically
- **Use Descriptive Names** for files
- **Ask Questions** if confused
- **Iterate Incrementally** on features
- **Check Console** for errors
- **Save Context** by referencing previous code

### Don'ts ❌

- **Don't** create huge files (split them up)
- **Don't** rely solely on AI (understand the code)
- **Don't** ignore error messages
- **Don't** delete files without confirmation
- **Don't** expect instant responses (AI takes time)
- **Don't** use in unsupported browsers
- **Don't** try to run backend servers (use WebContainer limits)

---

## Getting Help

### Resources

- **Documentation**: [https://docs.sparkcraft.dev](https://docs.sparkcraft.dev)
- **API Docs**: See `docs/API.md`
- **GitHub**: [https://github.com/d64483912-cmd/spark-craft-ide](https://github.com/d64483912-cmd/spark-craft-ide)
- **Issues**: Report bugs on GitHub

### Community

- **Discord**: Join our community server
- **Forum**: Ask questions and share projects
- **Twitter**: Follow @SparkCraftIDE for updates

### Support

For urgent issues:
- **Email**: support@sparkcraft.dev
- **Response Time**: 24-48 hours

---

## What's Next?

Now that you know the basics:

1. **Build a Project**
   - Start with something simple
   - Experiment with different prompts

2. **Explore Advanced Features**
   - Try WebContainer projects
   - Use split view for faster editing

3. **Share Your Work**
   - Export your projects
   - Share code with others
   - Contribute to the community

4. **Learn More**
   - Check out example projects
   - Read the API documentation
   - Join the Discord community

---

**Happy Coding! 🚀**

Built with ❤️ by the SparkCraft Team
