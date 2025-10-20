# Contributing to SparkCraft IDE

First off, thank you for considering contributing to SparkCraft IDE! It's people like you that make SparkCraft IDE such a great tool.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to conduct@sparkcraft.dev.

### Our Pledge

- Be respectful and inclusive
- Welcome newcomers and help them learn
- Accept constructive criticism gracefully
- Focus on what is best for the community
- Show empathy towards other community members

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples**
* **Describe the behavior you observed and what you expected**
* **Include screenshots if possible**
* **Specify your browser and OS version**

**Bug Report Template:**

```markdown
**Describe the bug**
A clear and concise description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected behavior**
A clear description of what you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment:**
 - OS: [e.g. Windows 10]
 - Browser: [e.g. Chrome 120]
 - Version: [e.g. 1.0.0]

**Additional context**
Add any other context about the problem here.
```

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested enhancement**
* **Explain why this enhancement would be useful**
* **List any similar features in other applications**

**Feature Request Template:**

```markdown
**Is your feature request related to a problem?**
A clear description of the problem.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Any alternative solutions or features you've considered.

**Additional context**
Add any other context or screenshots.
```

### Your First Code Contribution

Unsure where to begin? You can start by looking through these issues:

* `good-first-issue` - issues which should only require a few lines of code
* `help-wanted` - issues which should be a bit more involved
* `documentation` - improvements or additions to documentation

## Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- A modern code editor (VS Code recommended)

### Setup Steps

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/spark-craft-ide.git
   cd spark-craft-ide
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/d64483912-cmd/spark-craft-ide.git
   ```

4. **Install dependencies**
   ```bash
   npm install
   ```

5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

7. **Make your changes**
   - Write code
   - Add tests if applicable
   - Update documentation

8. **Test your changes**
   ```bash
   npm run lint
   npm run build
   ```

## Coding Standards

### TypeScript/JavaScript

**General Rules:**
- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable names
- Add comments for complex logic
- Avoid `any` type when possible
- Use functional components for React

**Example:**

```typescript
// ✅ Good
interface UserProfile {
  id: string;
  name: string;
  email: string;
}

function formatUserName(user: UserProfile): string {
  return `${user.name} (${user.email})`;
}

// ❌ Bad
function doStuff(data: any) {
  return data.x + data.y;
}
```

### React Components

**Component Structure:**

```typescript
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface MyComponentProps {
  title: string;
  onAction: () => void;
}

export const MyComponent = ({ title, onAction }: MyComponentProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
    onAction();
  };

  return (
    <div className="my-component">
      <h2>{title}</h2>
      <Button onClick={handleClick}>
        {isActive ? 'Active' : 'Inactive'}
      </Button>
    </div>
  );
};
```

**Rules:**
- Use functional components
- Props should have explicit types
- Extract complex logic into custom hooks
- Use descriptive event handler names (`handleClick`, not `onClick`)
- Destructure props in function parameters

### CSS/Styling

**Use Tailwind CSS:**

```typescript
// ✅ Good
<div className="flex items-center gap-4 p-4 rounded-lg bg-primary">
  <span className="text-lg font-semibold">Title</span>
</div>

// ❌ Bad (avoid inline styles)
<div style={{ display: 'flex', padding: '16px' }}>
  <span style={{ fontSize: '18px' }}>Title</span>
</div>
```

**Custom CSS Variables:**
```css
/* Use existing variables from index.css */
.my-component {
  background: hsl(var(--background));
  color: hsl(var(--foreground));
  border: 1px solid hsl(var(--border));
}
```

### File Naming

- Components: `PascalCase` (e.g., `ChatPanel.tsx`)
- Utilities: `camelCase` (e.g., `formatDate.ts`)
- Hooks: `camelCase` with `use` prefix (e.g., `useWebContainer.ts`)
- Types: `PascalCase` (e.g., `UserProfile.ts`)

### Import Order

```typescript
// 1. React/External libraries
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

// 2. Internal components
import { Button } from '@/components/ui/button';
import { ChatPanel } from '@/components/IDE/ChatPanel';

// 3. Hooks
import { useWebContainer } from '@/hooks/useWebContainer';

// 4. Utils/Lib
import { cn } from '@/lib/utils';

// 5. Types
import type { FileNode } from '@/types';

// 6. Styles (if any)
import './styles.css';
```

### Error Handling

```typescript
// ✅ Good - Specific error handling
try {
  const result = await apiCall();
  return result;
} catch (error) {
  console.error('Failed to fetch data:', error);
  toast.error(error instanceof Error ? error.message : 'Unknown error');
  throw error;
}

// ❌ Bad - Silent failures
try {
  await apiCall();
} catch (error) {
  // Nothing
}
```

## Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/).

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
# Feature
git commit -m "feat(editor): add multi-cursor support"

# Bug fix
git commit -m "fix(preview): resolve iframe rendering issue"

# Documentation
git commit -m "docs: update installation instructions"

# Refactor
git commit -m "refactor(chat): extract message parsing logic"

# With body
git commit -m "feat(webcontainer): add npm install progress tracking

Displays real-time progress during npm install
Shows package count and current package being installed
Improves user experience with loading feedback

Closes #123"
```

### Commit Best Practices

- Write in present tense ("add feature" not "added feature")
- Keep subject line under 50 characters
- Use body to explain what and why, not how
- Reference issues and PRs in footer

## Pull Request Process

### Before Submitting

1. **Update your branch**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Run tests and linter**
   ```bash
   npm run lint
   npm run build
   ```

3. **Update documentation**
   - Update README if needed
   - Add JSDoc comments
   - Update API docs if applicable

4. **Test thoroughly**
   - Test your changes in the browser
   - Check different scenarios
   - Verify nothing broke

### Submitting Pull Request

1. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Create Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill out the template

**PR Template:**

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe testing process

## Screenshots (if applicable)
Add screenshots

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have performed a self-review
- [ ] I have commented my code where needed
- [ ] I have updated the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix/feature works
- [ ] New and existing unit tests pass locally
```

3. **Respond to feedback**
   - Address review comments
   - Make requested changes
   - Be respectful and professional

### PR Review Process

1. Maintainer reviews the PR
2. Automated checks run (linting, build)
3. Feedback provided if needed
4. Once approved, PR is merged

## Project Structure

```
spark-craft-ide/
├── src/
│   ├── components/        # React components
│   │   ├── IDE/          # IDE-specific components
│   │   └── ui/           # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── integrations/     # Third-party integrations
│   ├── pages/            # Page components
│   └── types/            # TypeScript types
├── public/               # Static assets
├── supabase/            # Supabase configuration
│   ├── functions/       # Edge functions
│   └── migrations/      # Database migrations
├── docs/                # Documentation
└── [config files]       # Various config files
```

### Key Files

- `src/components/IDE/IDELayout.tsx` - Main layout orchestrator
- `src/components/IDE/ChatPanel.tsx` - AI chat interface
- `src/components/IDE/CodeEditor.tsx` - Monaco editor wrapper
- `src/components/IDE/PreviewPanel.tsx` - Live preview with WebContainer
- `src/hooks/useWebContainer.ts` - WebContainer lifecycle manager

### Adding New Features

1. **Create feature branch**
2. **Implement component/feature**
3. **Add to appropriate directory**
4. **Update related components**
5. **Add documentation**
6. **Test thoroughly**
7. **Submit PR**

## Testing Guidelines

### Manual Testing Checklist

- [ ] Feature works as expected
- [ ] No console errors
- [ ] Responsive on different screen sizes
- [ ] Works in Chrome, Firefox, Edge
- [ ] Accessible (keyboard navigation, screen readers)
- [ ] No performance issues
- [ ] Error states handled gracefully

### Writing Tests (Future)

When we add automated testing:

```typescript
describe('ChatPanel', () => {
  it('should send message when Enter is pressed', () => {
    // Test implementation
  });

  it('should display AI responses', () => {
    // Test implementation
  });
});
```

## Documentation

### Code Comments

```typescript
/**
 * Formats a date string for display
 * @param date - ISO date string
 * @param format - Format pattern (default: 'MM/DD/YYYY')
 * @returns Formatted date string
 * @example
 * formatDate('2024-01-01') // Returns '01/01/2024'
 */
function formatDate(date: string, format = 'MM/DD/YYYY'): string {
  // Implementation
}
```

### README Updates

Update README when:
- Adding new features
- Changing setup process
- Updating dependencies
- Modifying project structure

## Communication

### Where to Ask Questions

- **GitHub Discussions**: General questions
- **GitHub Issues**: Bug reports, feature requests
- **Discord**: Real-time chat
- **Email**: support@sparkcraft.dev

### Response Times

- Critical bugs: 24-48 hours
- Feature requests: 1-2 weeks
- General questions: 3-5 days

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Credited in relevant documentation

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to SparkCraft IDE! 🚀**

Questions? Contact us at contribute@sparkcraft.dev
