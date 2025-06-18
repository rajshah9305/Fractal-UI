// src/components/PromptInput.jsx
// Prompt input for Fractal UI generation
import React from 'react';

/**
 * Props:
 * @param {string} value - Current prompt value
 * @param {function} onChange - Called when prompt changes
 * @param {function} onSubmit - Called when 'Generate UI' is clicked
 * @param {boolean} loading - Whether generation is in progress
 */
export default function PromptInput({ value, onChange, onSubmit, loading }) {
  return (
    <form
      className="w-full flex flex-col gap-4"
      onSubmit={e => {
        e.preventDefault();
        if (!loading) onSubmit();
      }}
    >
      <label htmlFor="prompt" className="font-medium text-lg">
        Describe your UI
      </label>
      <textarea
        id="prompt"
        className="w-full min-h-[100px] max-h-60 p-3 rounded-lg border border-border bg-surface text-base resize-vertical focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="e.g. A modern login form with social login, dark mode, and animated button."
        value={value}
        onChange={e => onChange(e.target.value)}
        disabled={loading}
        required
        aria-label="UI description prompt"
      />
      <button
        type="submit"
        className="self-end px-6 py-2 rounded-lg bg-primary text-white font-semibold shadow hover:bg-indigo-600 transition disabled:opacity-60 disabled:cursor-not-allowed"
        disabled={loading || !value.trim()}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
            Generating...
          </span>
        ) : (
          'Generate UI'
        )}
      </button>
    </form>
  );
} 