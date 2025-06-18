// src/components/ProjectList.jsx
// Displays a list of saved projects with load/delete actions
import React from 'react';

/**
 * Props:
 * @param {Array} projects - [{ id, title, created_at }]
 * @param {function} onLoad - Called with project id to load
 * @param {function} onDelete - Called with project id to delete
 * @param {boolean} loading - Whether projects are loading
 * @param {string} currentProjectId - Currently loaded project id
 */
export default function ProjectList({ projects, onLoad, onDelete, loading, currentProjectId }) {
  return (
    <div className="w-full bg-surface border border-border rounded-lg p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold text-base">Your Projects</span>
        {loading && (
          <svg className="animate-spin h-5 w-5 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
        )}
      </div>
      {(!projects || projects.length === 0) && !loading ? (
        <div className="text-gray-400 text-sm">No projects found.</div>
      ) : (
        <ul className="divide-y divide-border">
          {projects.map(project => (
            <li key={project.id} className={`flex items-center justify-between py-2 ${currentProjectId === project.id ? 'bg-primary/10' : ''}`}>
              <button
                className={`text-left flex-1 font-medium truncate ${currentProjectId === project.id ? 'text-primary' : 'text-white'} hover:underline`}
                onClick={() => onLoad(project.id)}
                aria-label={`Load project ${project.title}`}
              >
                {project.title}
                <span className="block text-xs text-gray-400 font-normal">{new Date(project.created_at).toLocaleString()}</span>
              </button>
              <button
                className="ml-2 px-2 py-1 rounded bg-error text-white text-xs font-medium hover:bg-red-600 transition"
                onClick={() => onDelete(project.id)}
                aria-label={`Delete project ${project.title}`}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
} 