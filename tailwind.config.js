/** @type {import('tailwindcss').Config} */
module.exports = {
  // The content array tells Tailwind which files to scan for classes.
  // It's optimized to only include source files where Tailwind classes are used.
  // The unnecessary path to 'lucide-react' has been removed, as its classes
  // are picked up from your component files.
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './node_modules/shadcn-ui/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1', // indigo-500
        accent: '#f59e42', // orange-400
        background: '#0f172a', // slate-900
        surface: '#1e293b', // slate-800
        border: '#334155', // slate-700
        error: '#ef4444', // red-500
        success: '#22c55e', // green-500
        warning: '#facc15', // yellow-400
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
