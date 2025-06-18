// src/pages/index.jsx
// Main Fractal UI App - All-in-one immersive experience
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AuthProvider, useAuth } from '../components/AuthProvider';
import LoginForm from '../components/Auth/LoginForm';
import PromptInput from '../components/PromptInput';
import CodeDisplay from '../components/CodeDisplay';
import LivePreview from '../components/LivePreview';
import ProjectList from '../components/ProjectList';
import MessageBox from '../components/MessageBox';
import { supabase } from '../lib/supabaseClient';
import '../styles/globals.css';

// --- App Shell ---
function FractalUIApp() {
  // --- State Management ---
  const { user, loading: authLoading, login, signup, socialLogin, logout } = useAuth();
  const [prompt, setPrompt] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [projectsLoading, setProjectsLoading] = useState(false);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  
  // Memoize the user ID to create a stable dependency for useEffect hooks.
  const userId = useMemo(() => user?.id, [user]);

  // --- Project Loading and Realtime Subscription ---
  useEffect(() => {
    // Exit early if there is no authenticated user.
    if (!userId) return;

    let projectChannel = null;

    const fetchProjects = async () => {
      setProjectsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (fetchError) {
        setMessage({
          title: 'Error Loading Projects',
          message: fetchError.message,
          type: 'error',
          open: true,
          onClose: () => setMessage(null),
          actions: [{ label: 'OK', onClick: () => setMessage(null), variant: 'primary' }],
        });
      } else {
        setProjects(data || []);
      }
      setProjectsLoading(false);
    };

    fetchProjects();

    // Set up a real-time subscription to the 'projects' table.
    projectChannel = supabase
      .channel(`public:projects:user_id=eq.${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'projects' }, (payload) => {
        setProjects(p => [payload.new, ...p].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'projects' }, (payload) => {
        setProjects(p => p.filter(prj => prj.id !== payload.old.id));
      })
      .subscribe((status, err) => {
          if (status === 'SUBSCRIBED') {
            console.log('Real-time project subscription active.');
          }
          if (status === 'CHANNEL_ERROR') {
             console.error('Real-time subscription error:', err.message);
          }
      });
      

    // Cleanup function: remove the channel subscription when the component unmounts or the user changes.
    return () => {
      if (projectChannel) {
        supabase.removeChannel(projectChannel);
        projectChannel = null;
      }
    };
  }, [userId]); // This effect now correctly depends on the stable `userId`.

  // --- Project CRUD Operations (memoized for stability) ---
  const handleSaveProject = useCallback(async () => {
    if (!userId) return;
    if (!prompt.trim() || !generatedCode.trim()) {
      setMessage({
        title: 'Missing Data',
        message: 'Please generate some code before saving.',
        type: 'warning',
        open: true,
        onClose: () => setMessage(null),
        actions: [{ label: 'OK', onClick: () => setMessage(null), variant: 'primary' }],
      });
      return;
    }
    const title = prompt.split('\n')[0].slice(0, 60) || 'Untitled Project';
    const { error: saveError } = await supabase.from('projects').insert({
      user_id: userId,
      title,
      prompt,
      generated_code: generatedCode,
      is_public: false,
    });
    if (saveError) {
      setMessage({
        title: 'Save Failed', message: saveError.message, type: 'error', open: true,
        onClose: () => setMessage(null), actions: [{ label: 'OK', onClick: () => setMessage(null), variant: 'primary' }]
      });
    } else {
      setMessage({
        title: 'Project Saved', message: 'Your project was saved successfully.', type: 'success', open: true,
        onClose: () => setMessage(null), actions: [{ label: 'OK', onClick: () => setMessage(null), variant: 'primary' }]
      });
    }
  }, [userId, prompt, generatedCode]);

  const handleLoadProject = useCallback((id) => {
    const project = projects.find(p => p.id === id);
    if (project) {
      setPrompt(project.prompt);
      setGeneratedCode(project.generated_code);
      setCurrentProjectId(id);
    }
  }, [projects]);

  const handleDeleteProject = useCallback((id) => {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    setMessage({
      title: 'Delete Project',
      message: `Are you sure you want to delete "${project.title}"? This cannot be undone.`,
      type: 'warning', open: true, onClose: () => setMessage(null),
      actions: [
        { label: 'Cancel', onClick: () => setMessage(null), variant: 'default' },
        {
          label: 'Delete',
          onClick: async () => {
            await supabase.from('projects').delete().eq('id', id);
            setMessage(null);
            if (currentProjectId === id) {
              setPrompt(''); setGeneratedCode(''); setCurrentProjectId(null);
            }
          },
          variant: 'danger',
        },
      ],
    });
  }, [projects, currentProjectId]);

  // --- AI Generation ---
  const handleGenerate = useCallback(async () => {
    setAiLoading(true);
    setError('');
    setGeneratedCode('');
    try {
      const res = await fetch('/api/generate-ui', {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'AI generation failed');
      setGeneratedCode(data.code);
    } catch (err) {
      setError(err.message);
      setMessage({
        title: 'Generation Error', message: err.message, type: 'error', open: true,
        onClose: () => setMessage(null), actions: [{ label: 'OK', onClick: () => setMessage(null), variant: 'primary' }]
      });
    } finally {
      setAiLoading(false);
    }
  }, [prompt]);

  // --- Render Logic ---
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <svg className="animate-spin h-10 w-10 text-primary" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <LoginForm onLogin={login} onSignup={signup} onSocial={socialLogin} loading={authLoading} error={error} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      <header className="w-full flex items-center justify-between px-6 py-4 bg-surface border-b border-border shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-display font-bold tracking-tight text-primary">Fractal UI</span>
          <span className="text-xs bg-primary/80 text-white px-2 py-1 rounded-full">AI-Powered</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-300 hidden md:inline">{user.email}</span>
          <button
            className="px-4 py-2 rounded-lg bg-error text-white font-semibold hover:bg-red-600 transition-colors shadow-sm"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="flex-1 w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 p-6">
        <aside className="lg:col-span-3 xl:col-span-2">
          <ProjectList projects={projects} onLoad={handleLoadProject} onDelete={handleDeleteProject} loading={projectsLoading} currentProjectId={currentProjectId}/>
        </aside>
        
        <section className="lg:col-span-5 xl:col-span-6 flex flex-col gap-6">
          <PromptInput value={prompt} onChange={setPrompt} onSubmit={handleGenerate} loading={aiLoading} />
          {generatedCode && <CodeDisplay code={generatedCode} language="jsx" />}
          <div className="flex gap-4 mt-auto pt-4">
            <button
              className="px-5 py-2 rounded-lg bg-success text-white font-semibold hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              onClick={handleSaveProject}
              disabled={aiLoading || !generatedCode}
            >
              Save Project
            </button>
            <button
              className="px-5 py-2 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-700 transition-colors disabled:opacity-50"
              onClick={() => {
                setPrompt(''); setGeneratedCode(''); setCurrentProjectId(null);
              }}
              disabled={aiLoading && !generatedCode && !prompt}
            >
              New Project
            </button>
          </div>
        </section>
        
        <aside className="lg:col-span-4 xl:col-span-4 flex-shrink-0">
          <LivePreview code={generatedCode} />
        </aside>
      </main>

      {message && <MessageBox {...message} />}
      
      <footer className="w-full text-center text-xs text-gray-500 py-4 bg-surface border-t border-border">
        &copy; {new Date().getFullYear()} Fractal UI &mdash; AI-powered UI generation platform.
      </footer>
    </div>
  );
}

// --- App Wrapper ---
export default function App() {
  return (
    <AuthProvider>
      <FractalUIApp />
    </AuthProvider>
  );
}
