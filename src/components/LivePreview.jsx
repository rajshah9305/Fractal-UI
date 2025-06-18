// src/components/LivePreview.jsx
// Renders generated React+Tailwind code in a sandboxed iframe
import React from 'react';

/**
 * Props:
 * @param {string} code - The generated React component code (JSX)
 */
export default function LivePreview({ code }) {
  // This srcDoc now uses React 18's createRoot API, which is the current standard.
  // It replaces the legacy ReactDOM.render method.
  const srcDoc = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  primary: '#6366f1',
                  accent: '#f59e42',
                  background: '#0f172a',
                  surface: '#1e293b',
                  border: '#334155',
                }
              }
            }
          }
        </script>
        <style>
          body { 
            background-color: #0f172a; 
            color: #fff; 
            margin: 0; 
            font-family: Inter, ui-sans-serif, system-ui; 
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
        </style>
      </head>
      <body>
        <div id="root"></div>
        
        <!-- React and Babel scripts for live transpilation -->
        <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
        
        <script type="text/babel">
          // It is assumed the generated code exports a component named 'GeneratedUI'
          // For example: export default function GeneratedUI() { ... }
          
          const ErrorDisplay = ({ message }) => (
            <div style={{ color: '#ef4444', padding: '2rem', fontSize: '1.1rem', fontFamily: 'monospace' }}>
              <strong>Preview Error:</strong>
              <p style={{ marginTop: '1rem' }}>{message}</p>
            </div>
          );

          try {
            // Transpile and evaluate the user-provided code
            const transformedCode = Babel.transform(\`
                // Add React import automatically
                import React from 'react';
                ${code}
                // Check if a default export exists and assign it to a known variable
                const component = (typeof GeneratedUI !== 'undefined') ? GeneratedUI : null;
                window.ComponentToRender = component;
            \`, { presets: ['react'] }).code;

            // Use a new Function constructor to evaluate in a safer scope
            new Function(transformedCode)();

            const container = document.getElementById('root');
            const root = ReactDOM.createRoot(container);

            if (window.ComponentToRender) {
              root.render(React.createElement(window.ComponentToRender));
            } else {
              root.render(<ErrorDisplay message="No component named 'GeneratedUI' was found or exported." />);
            }
          } catch (e) {
            const container = document.getElementById('root');
            const root = ReactDOM.createRoot(container);
            root.render(<ErrorDisplay message={e.message} />);
          }
        </script>
      </body>
    </html>
  `;

  return (
    <div className="w-full h-full min-h-[400px] border border-border rounded-lg overflow-hidden bg-background shadow-inner">
      <iframe
        srcDoc={srcDoc}
        title="Live UI Preview"
        sandbox="allow-scripts" // allow-same-origin is removed for better security sandboxing
        className="w-full h-full"
        style={{ background: '#0f172a' }}
        loading="lazy"
      />
    </div>
  );
}
