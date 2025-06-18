-- Fractal UI Supabase Schema

-- Enable required extensions
create extension if not exists "uuid-ossp";

-- Projects table
create table if not exists projects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users not null,
  title text not null,
  prompt text not null,
  generated_code text not null,
  created_at timestamp with time zone default timezone('utc', now()),
  is_public boolean default false
);

-- Index for user_id
create index if not exists idx_projects_user_id on projects(user_id);

-- Row Level Security
alter table projects enable row level security;

-- Policy: Users can manage their own projects
create policy "Users can manage their own projects" on projects
  for all
  using (auth.uid() = user_id);

-- Policy: Public can read public projects
create policy "Public can read public projects" on projects
  for select
  using (is_public = true);

-- To apply: psql -U postgres -d postgres -f /docker-entrypoint-initdb.d/schema.sql 