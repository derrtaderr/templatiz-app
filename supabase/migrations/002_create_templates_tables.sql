-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Templates table
CREATE TABLE IF NOT EXISTS public.templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    preview TEXT NOT NULL,
    platform VARCHAR(50) NOT NULL CHECK (platform IN ('twitter', 'linkedin')),
    category VARCHAR(50) NOT NULL,
    original_post_url TEXT,
    original_author TEXT,
    original_author_avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    last_used_at TIMESTAMP WITH TIME ZONE,
    usage_count INTEGER DEFAULT 0,
    engagement_rate DECIMAL(5,2) DEFAULT 0.00
);

-- Template analytics table
CREATE TABLE IF NOT EXISTS public.template_analytics (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES public.templates(id) ON DELETE CASCADE,
    views INTEGER DEFAULT 0,
    copies INTEGER DEFAULT 0,
    shares INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Template versions table (for tracking changes)
CREATE TABLE IF NOT EXISTS public.template_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    template_id UUID REFERENCES public.templates(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    created_by UUID REFERENCES auth.users(id)
);

-- Add RLS policies
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.template_versions ENABLE ROW LEVEL SECURITY;

-- Templates policies
CREATE POLICY "Users can view their own templates"
    ON public.templates FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own templates"
    ON public.templates FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own templates"
    ON public.templates FOR UPDATE
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own templates"
    ON public.templates FOR DELETE
    USING (auth.uid() = user_id);

-- Analytics policies
CREATE POLICY "Users can view analytics for their templates"
    ON public.template_analytics FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.templates
        WHERE templates.id = template_analytics.template_id
        AND templates.user_id = auth.uid()
    ));

-- Template versions policies
CREATE POLICY "Users can view versions of their templates"
    ON public.template_versions FOR SELECT
    USING (EXISTS (
        SELECT 1 FROM public.templates
        WHERE templates.id = template_versions.template_id
        AND templates.user_id = auth.uid()
    ));

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS templates_user_id_idx ON public.templates(user_id);
CREATE INDEX IF NOT EXISTS templates_platform_idx ON public.templates(platform);
CREATE INDEX IF NOT EXISTS templates_category_idx ON public.templates(category);
CREATE INDEX IF NOT EXISTS template_analytics_template_id_idx ON public.template_analytics(template_id);
CREATE INDEX IF NOT EXISTS template_versions_template_id_idx ON public.template_versions(template_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_templates_updated_at
    BEFORE UPDATE ON public.templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 