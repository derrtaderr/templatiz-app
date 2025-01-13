-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Create users table (extends Supabase auth.users)
create table public.users (
    id uuid references auth.users primary key,
    name text not null,
    role text check (role in ('creator', 'marketer', 'founder')) not null,
    preferences jsonb default '{}',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create templates table
create table public.templates (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users not null,
    content text not null,
    category text check (category in ('knowledge', 'growth', 'authority')) not null,
    tags text[] default array[]::text[],
    source_metadata jsonb default '{}',
    performance_metrics jsonb default '{}',
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create posts table
create table public.posts (
    id uuid default uuid_generate_v4() primary key,
    template_id uuid references public.templates,
    user_id uuid references public.users not null,
    platform text check (platform in ('linkedin', 'twitter', 'youtube')) not null,
    scheduled_time timestamptz not null,
    status text check (status in ('draft', 'scheduled', 'published')) not null default 'draft',
    content text not null,
    created_at timestamptz default now(),
    updated_at timestamptz default now()
);

-- Create analytics table
create table public.analytics (
    id uuid default uuid_generate_v4() primary key,
    template_id uuid references public.templates,
    post_id uuid references public.posts,
    metrics jsonb not null default '{}',
    recorded_at timestamptz default now()
);

-- Create integrations table
create table public.integrations (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users not null,
    platform text check (platform in ('linkedin', 'twitter', 'youtube')) not null,
    auth_token text not null,
    refresh_token text,
    expires_at timestamptz,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    unique(user_id, platform)
);

-- Create indexes for better query performance
create index idx_templates_user_id on public.templates(user_id);
create index idx_templates_category on public.templates(category);
create index idx_posts_user_id on public.posts(user_id);
create index idx_posts_scheduled_time on public.posts(scheduled_time);
create index idx_posts_status on public.posts(status);
create index idx_analytics_template_id on public.analytics(template_id);
create index idx_analytics_post_id on public.analytics(post_id);
create index idx_analytics_recorded_at on public.analytics(recorded_at);

-- Create updated_at trigger function
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

-- Add updated_at triggers to all tables
create trigger update_users_updated_at
    before update on public.users
    for each row
    execute function update_updated_at_column();

create trigger update_templates_updated_at
    before update on public.templates
    for each row
    execute function update_updated_at_column();

create trigger update_posts_updated_at
    before update on public.posts
    for each row
    execute function update_updated_at_column();

create trigger update_integrations_updated_at
    before update on public.integrations
    for each row
    execute function update_updated_at_column();

-- Row Level Security Policies
alter table public.users enable row level security;
alter table public.templates enable row level security;
alter table public.posts enable row level security;
alter table public.analytics enable row level security;
alter table public.integrations enable row level security;

-- Users can only access their own data
create policy "Users can view own data"
    on public.users for all
    using (auth.uid() = id);

create policy "Users can view own templates"
    on public.templates for all
    using (auth.uid() = user_id);

create policy "Users can view own posts"
    on public.posts for all
    using (auth.uid() = user_id);

create policy "Users can view own analytics"
    on public.analytics for all
    using (exists (
        select 1 from public.templates
        where templates.id = analytics.template_id
        and templates.user_id = auth.uid()
    ));

create policy "Users can view own integrations"
    on public.integrations for all
    using (auth.uid() = user_id); 