-- Create templates table
create table if not exists public.templates (
    id uuid default gen_random_uuid() primary key,
    user_id text not null,
    title text not null,
    content text not null,
    preview text,
    platform text not null,
    category text not null,
    original_author text,
    original_author_avatar text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    usage_count integer default 0,
    engagement_rate numeric(5,2) default 0.00
);

-- Add RLS policies
alter table public.templates enable row level security;

create policy "Users can view their own templates"
    on public.templates for select
    using (auth.uid()::text = user_id);

create policy "Users can insert their own templates"
    on public.templates for insert
    with check (auth.uid()::text = user_id);

create policy "Users can update their own templates"
    on public.templates for update
    using (auth.uid()::text = user_id);

create policy "Users can delete their own templates"
    on public.templates for delete
    using (auth.uid()::text = user_id);

-- Create indexes
create index templates_user_id_idx on public.templates(user_id);
create index templates_platform_idx on public.templates(platform);
create index templates_category_idx on public.templates(category);
create index templates_created_at_idx on public.templates(created_at desc); 