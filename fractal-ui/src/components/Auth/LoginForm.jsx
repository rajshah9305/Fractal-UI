// src/components/Auth/LoginForm.jsx
// Login form with email/password and social login
import React, { useState } from 'react';

/**
 * Props:
 * @param {function} onLogin - Called with (email, password)
 * @param {function} onSignup - Called with (email, password)
 * @param {function} onSocial - Called with provider ('google'|'github')
 * @param {boolean} loading - Loading state
 * @param {string} error - Error message
 */
export default function LoginForm({ onLogin, onSignup, onSocial, loading, error }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full max-w-sm mx-auto bg-surface border border-border rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-center">Sign in to Fractal UI</h2>
      {error && <div className="mb-3 text-error text-sm text-center">{error}</div>}
      <form
        className="flex flex-col gap-3"
        onSubmit={e => {
          e.preventDefault();
          onLogin(email, password);
        }}
      >
        <input
          type="email"
          className="p-2 rounded border border-border bg-background text-white focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
          disabled={loading}
        />
        <input
          type="password"
          className="p-2 rounded border border-border bg-background text-white focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
          disabled={loading}
        />
        <button
          type="submit"
          className="w-full py-2 rounded bg-primary text-white font-semibold hover:bg-indigo-600 transition disabled:opacity-60"
          disabled={loading}
        >
          Sign In
        </button>
        <button
          type="button"
          className="w-full py-2 rounded bg-accent text-white font-semibold hover:bg-orange-500 transition disabled:opacity-60"
          onClick={() => onSignup(email, password)}
          disabled={loading}
        >
          Sign Up
        </button>
      </form>
      <div className="my-4 flex items-center gap-2">
        <div className="flex-1 h-px bg-border" />
        <span className="text-xs text-gray-400">or</span>
        <div className="flex-1 h-px bg-border" />
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="w-full flex items-center justify-center gap-2 py-2 rounded bg-white text-black font-semibold border border-border hover:bg-gray-100 transition"
          onClick={() => onSocial('google')}
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 10.8V13.7h5.5c-.2 1.2-1.4 3.5-5.5 3.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.7C16.7 2.7 14.6 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10c5.7 0 9.5-4 9.5-9.5 0-.6-.1-1.1-.2-1.7H12z"/><path fill="#34A853" d="M3.5 7.6l2.9 2.1C7.3 8.2 9.4 6.5 12 6.5c1.6 0 3 .6 4.1 1.7l3-2.9C17.7 3.7 15.1 2.5 12 2.5c-3.7 0-6.8 2.1-8.5 5.1z"/><path fill="#FBBC05" d="M12 21.5c-3.1 0-5.7-1-7.6-2.7l-3-2.9c1.7 3 4.8 5.1 8.5 5.1 2.7 0 5.2-.9 7.1-2.5l-2.9-2.3c-1.1.7-2.5 1.3-4.1 1.3z"/><path fill="#4285F4" d="M21.5 12.2c0-.7-.1-1.3-.2-1.7H12v3.4h5.5c-.2 1.2-1.4 3.5-5.5 3.5-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.2.8 3.9 1.5l2.7-2.7C16.7 2.7 14.6 2 12 2 6.5 2 2 6.5 2 12s4.5 10 10 10c5.7 0 9.5-4 9.5-9.5z"/></svg>
          Continue with Google
        </button>
        <button
          className="w-full flex items-center justify-center gap-2 py-2 rounded bg-black text-white font-semibold border border-border hover:bg-gray-900 transition"
          onClick={() => onSocial('github')}
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12c0 4.4 2.9 8.1 6.8 9.4.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.2-3.4-1.2-.4-1-1-1.3-1-1.3-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.4 2.1 1 2.6.8.1-.6.3-1 .6-1.2-2.2-.2-4.5-1.1-4.5-4.8 0-1.1.4-2 1-2.7-.1-.2-.4-1.2.1-2.5 0 0 .8-.3 2.7 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.5.6.7 1 1.6 1 2.7 0 3.7-2.3 4.6-4.5 4.8.3.3.6.8.6 1.7v2.5c0 .3.2.6.7.5C19.1 20.1 22 16.4 22 12c0-5.5-4.5-10-10-10z"/></svg>
          Continue with GitHub
        </button>
      </div>
    </div>
  );
} 