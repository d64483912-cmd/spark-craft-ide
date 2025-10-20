export interface ProjectTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'web' | 'react' | 'vue' | 'vanilla' | 'other';
  files: Array<{
    name: string;
    path: string;
    content: string;
    language: string;
  }>;
}

export const projectTemplates: ProjectTemplate[] = [
  {
    id: 'html-starter',
    name: 'HTML Starter',
    description: 'Simple HTML page with CSS and JavaScript',
    icon: '📄',
    category: 'web',
    files: [
      {
        name: 'index.html',
        path: '/index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header>
    <h1>Welcome to My Website</h1>
  </header>
  
  <main>
    <section class="hero">
      <h2>Build Something Amazing</h2>
      <p>Start creating your web application today!</p>
      <button id="cta-button">Get Started</button>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2024 My Website. All rights reserved.</p>
  </footer>
  
  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: 'styles.css',
        path: '/styles.css',
        language: 'css',
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
}

header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero {
  text-align: center;
  padding: 4rem 2rem;
}

.hero h2 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
}

button {
  background: #667eea;
  color: white;
  border: none;
  padding: 1rem 2rem;
  font-size: 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

button:hover {
  background: #5568d3;
}

footer {
  background: #f4f4f4;
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
}`,
      },
      {
        name: 'script.js',
        path: '/script.js',
        language: 'javascript',
        content: `// Get button element
const ctaButton = document.getElementById('cta-button');

// Add click event listener
ctaButton.addEventListener('click', () => {
  alert('Welcome! Let\\'s start building!');
});

// Add smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});`,
      },
    ],
  },
  {
    id: 'react-vite',
    name: 'React + Vite',
    description: 'Modern React application with Vite',
    icon: '⚛️',
    category: 'react',
    files: [
      {
        name: 'package.json',
        path: '/package.json',
        language: 'json',
        content: JSON.stringify({
          name: 'react-vite-app',
          version: '1.0.0',
          type: 'module',
          scripts: {
            dev: 'vite',
            build: 'vite build',
            preview: 'vite preview',
          },
          dependencies: {
            react: '^18.3.1',
            'react-dom': '^18.3.1',
          },
          devDependencies: {
            '@types/react': '^18.3.3',
            '@types/react-dom': '^18.3.0',
            '@vitejs/plugin-react': '^4.2.0',
            vite: '^5.0.0',
          },
        }, null, 2),
      },
      {
        name: 'vite.config.js',
        path: '/vite.config.js',
        language: 'javascript',
        content: `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})`,
      },
      {
        name: 'index.html',
        path: '/index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>React + Vite App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>`,
      },
      {
        name: 'main.jsx',
        path: '/src/main.jsx',
        language: 'javascript',
        content: `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
      },
      {
        name: 'App.jsx',
        path: '/src/App.jsx',
        language: 'javascript',
        content: `import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to React + Vite</h1>
        <div className="card">
          <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p>
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
      </header>
    </div>
  )
}

export default App`,
      },
      {
        name: 'App.css',
        path: '/src/App.css',
        language: 'css',
        content: `.App {
  text-align: center;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.card {
  padding: 2rem;
}

button {
  font-size: 1.2rem;
  padding: 0.8rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background-color: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

code {
  background-color: rgba(0, 0, 0, 0.2);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
}`,
      },
      {
        name: 'index.css',
        path: '/src/index.css',
        language: 'css',
        content: `body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`,
      },
    ],
  },
  {
    id: 'landing-page',
    name: 'Landing Page',
    description: 'Responsive landing page template',
    icon: '🚀',
    category: 'web',
    files: [
      {
        name: 'index.html',
        path: '/index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Product Landing Page</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <nav class="navbar">
    <div class="container">
      <div class="logo">MyProduct</div>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#pricing">Pricing</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </div>
  </nav>

  <section class="hero">
    <div class="container">
      <h1>Build Amazing Things</h1>
      <p>The ultimate tool for modern developers</p>
      <button class="cta-button">Get Started Free</button>
    </div>
  </section>

  <section id="features" class="features">
    <div class="container">
      <h2>Features</h2>
      <div class="feature-grid">
        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3>Lightning Fast</h3>
          <p>Optimized for maximum performance</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔒</div>
          <h3>Secure</h3>
          <p>Enterprise-grade security</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🎨</div>
          <h3>Beautiful</h3>
          <p>Stunning user interface</p>
        </div>
      </div>
    </div>
  </section>

  <section id="pricing" class="pricing">
    <div class="container">
      <h2>Pricing</h2>
      <div class="pricing-grid">
        <div class="pricing-card">
          <h3>Starter</h3>
          <div class="price">$9<span>/month</span></div>
          <ul>
            <li>✓ 5 Projects</li>
            <li>✓ 10GB Storage</li>
            <li>✓ Email Support</li>
          </ul>
          <button>Choose Plan</button>
        </div>
        <div class="pricing-card featured">
          <h3>Pro</h3>
          <div class="price">$29<span>/month</span></div>
          <ul>
            <li>✓ Unlimited Projects</li>
            <li>✓ 100GB Storage</li>
            <li>✓ Priority Support</li>
          </ul>
          <button>Choose Plan</button>
        </div>
        <div class="pricing-card">
          <h3>Enterprise</h3>
          <div class="price">$99<span>/month</span></div>
          <ul>
            <li>✓ Everything in Pro</li>
            <li>✓ Unlimited Storage</li>
            <li>✓ Dedicated Support</li>
          </ul>
          <button>Choose Plan</button>
        </div>
      </div>
    </div>
  </section>

  <footer>
    <div class="container">
      <p>&copy; 2024 MyProduct. All rights reserved.</p>
    </div>
  </footer>

  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: 'styles.css',
        path: '/styles.css',
        language: 'css',
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

/* Navbar */
.navbar {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.navbar .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #667eea;
}

.nav-links {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: #333;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #667eea;
}

/* Hero */
.hero {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 8rem 0;
  text-align: center;
}

.hero h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.hero p {
  font-size: 1.5rem;
  margin-bottom: 2rem;
}

.cta-button {
  background: white;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
}

/* Features */
.features {
  padding: 6rem 0;
}

.features h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.feature-card {
  text-align: center;
  padding: 2rem;
  border-radius: 10px;
  background: #f9f9f9;
  transition: transform 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

/* Pricing */
.pricing {
  padding: 6rem 0;
  background: #f9f9f9;
}

.pricing h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.pricing-card {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  border: 2px solid #e0e0e0;
}

.pricing-card.featured {
  border-color: #667eea;
  transform: scale(1.05);
}

.price {
  font-size: 2.5rem;
  font-weight: bold;
  color: #667eea;
  margin: 1rem 0;
}

.price span {
  font-size: 1rem;
  color: #666;
}

.pricing-card ul {
  list-style: none;
  margin: 2rem 0;
}

.pricing-card li {
  padding: 0.5rem 0;
}

.pricing-card button {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;
}

.pricing-card button:hover {
  background: #5568d3;
}

/* Footer */
footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 2rem;
}`,
      },
      {
        name: 'script.js',
        path: '/script.js',
        language: 'javascript',
        content: `// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add animation on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe all feature and pricing cards
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.6s, transform 0.6s';
  observer.observe(card);
});

// CTA button click handler
document.querySelector('.cta-button').addEventListener('click', () => {
  alert('Welcome! Ready to get started?');
});`,
      },
    ],
  },
  {
    id: 'todo-app',
    name: 'Todo App',
    description: 'Simple todo list application',
    icon: '✅',
    category: 'vanilla',
    files: [
      {
        name: 'index.html',
        path: '/index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Todo App</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <div class="container">
    <h1>📝 My Todo List</h1>
    
    <div class="input-container">
      <input type="text" id="todo-input" placeholder="What needs to be done?" />
      <button id="add-button">Add</button>
    </div>
    
    <ul id="todo-list"></ul>
    
    <div class="stats">
      <span id="todo-count">0 items left</span>
      <button id="clear-completed">Clear Completed</button>
    </div>
  </div>
  
  <script src="script.js"></script>
</body>
</html>`,
      },
      {
        name: 'styles.css',
        path: '/styles.css',
        language: 'css',
        content: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.container {
  background: white;
  border-radius: 10px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  width: 100%;
  max-width: 600px;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
}

.input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

#todo-input {
  flex: 1;
  padding: 0.8rem;
  border: 2px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1rem;
}

#todo-input:focus {
  outline: none;
  border-color: #667eea;
}

button {
  padding: 0.8rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

button:hover {
  background: #5568d3;
}

#todo-list {
  list-style: none;
  margin-bottom: 1.5rem;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f9f9f9;
  margin-bottom: 0.5rem;
  border-radius: 5px;
  transition: background 0.3s;
}

.todo-item:hover {
  background: #f0f0f0;
}

.todo-item.completed {
  opacity: 0.6;
}

.todo-item.completed .todo-text {
  text-decoration: line-through;
}

.todo-checkbox {
  margin-right: 1rem;
  cursor: pointer;
  width: 20px;
  height: 20px;
}

.todo-text {
  flex: 1;
}

.delete-button {
  padding: 0.5rem 1rem;
  background: #ff4757;
  font-size: 0.9rem;
}

.delete-button:hover {
  background: #ff3838;
}

.stats {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #e0e0e0;
  color: #666;
}

#clear-completed {
  background: #ff4757;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
}

#clear-completed:hover {
  background: #ff3838;
}`,
      },
      {
        name: 'script.js',
        path: '/script.js',
        language: 'javascript',
        content: `// Get elements
const todoInput = document.getElementById('todo-input');
const addButton = document.getElementById('add-button');
const todoList = document.getElementById('todo-list');
const todoCount = document.getElementById('todo-count');
const clearCompletedButton = document.getElementById('clear-completed');

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos() {
  todoList.innerHTML = '';
  
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = \`todo-item \${todo.completed ? 'completed' : ''}\`;
    
    li.innerHTML = \`
      <input type="checkbox" class="todo-checkbox" \${todo.completed ? 'checked' : ''} onchange="toggleTodo(\${index})">
      <span class="todo-text">\${todo.text}</span>
      <button class="delete-button" onclick="deleteTodo(\${index})">Delete</button>
    \`;
    
    todoList.appendChild(li);
  });
  
  updateCount();
}

// Add todo
function addTodo() {
  const text = todoInput.value.trim();
  
  if (text) {
    todos.push({
      text: text,
      completed: false
    });
    
    todoInput.value = '';
    saveTodos();
    renderTodos();
  }
}

// Toggle todo
function toggleTodo(index) {
  todos[index].completed = !todos[index].completed;
  saveTodos();
  renderTodos();
}

// Delete todo
function deleteTodo(index) {
  todos.splice(index, 1);
  saveTodos();
  renderTodos();
}

// Clear completed
function clearCompleted() {
  todos = todos.filter(todo => !todo.completed);
  saveTodos();
  renderTodos();
}

// Update count
function updateCount() {
  const count = todos.filter(todo => !todo.completed).length;
  todoCount.textContent = \`\${count} item\${count !== 1 ? 's' : ''} left\`;
}

// Save to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Event listeners
addButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});
clearCompletedButton.addEventListener('click', clearCompleted);

// Initial render
renderTodos();`,
      },
    ],
  },
];

export function getTemplateById(id: string): ProjectTemplate | undefined {
  return projectTemplates.find(template => template.id === id);
}

export function getTemplatesByCategory(category: ProjectTemplate['category']): ProjectTemplate[] {
  return projectTemplates.filter(template => template.category === category);
}
