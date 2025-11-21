-- Categories
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    name JSONB NOT NULL, -- BilingualText {en, dv}
    slug TEXT UNIQUE NOT NULL,
    color TEXT NOT NULL,

    -- Hierarchy
    parent_id TEXT REFERENCES categories(id),

    -- Content
    description JSONB, -- BilingualText - SEO description
    icon TEXT, -- Emoji or icon identifier

    -- Ordering & State
    "order" INTEGER NOT NULL DEFAULT 0, -- Manual sort order
    is_active BOOLEAN DEFAULT TRUE, -- Enable/disable without deleting

    -- Special categories (e.g., Elections with custom pages)
    is_special BOOLEAN DEFAULT FALSE,
    special_page_route TEXT, -- Custom route path (e.g., "/elections")

    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_by TEXT -- User ID who created the category
);

-- Authors
CREATE TABLE authors (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    name JSONB NOT NULL, -- BilingualText
    bio JSONB NOT NULL, -- BilingualText
    photo TEXT NOT NULL,
    social_links JSONB -- {twitter, linkedin, facebook, email}
);

-- Articles
CREATE TABLE articles (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title JSONB NOT NULL, -- BilingualText
    subtitle JSONB, -- BilingualText
    summary JSONB NOT NULL, -- BilingualText
    body JSONB NOT NULL, -- BilingualText (HTML content)
    cover_image TEXT NOT NULL,
    category_id TEXT REFERENCES categories(id),
    author_id TEXT REFERENCES authors(id),
    published_at TIMESTAMP WITH TIME ZONE NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE,
    featured BOOLEAN DEFAULT FALSE,
    status TEXT DEFAULT 'draft', -- 'draft' | 'published' | 'scheduled'
    has_video BOOLEAN DEFAULT FALSE,
    video_url TEXT,
    tags JSONB, -- Array of BilingualText
    related_article_ids TEXT[], -- Array of article IDs

    -- Scheduling
    scheduled_for TIMESTAMP WITH TIME ZONE, -- When to auto-publish

    -- Tracking
    last_edited_at TIMESTAMP WITH TIME ZONE, -- Last edit timestamp
    last_edited_by TEXT, -- Who last edited
    published_by TEXT, -- Who published

    -- SEO
    meta_description JSONB, -- BilingualText - SEO description
    keywords TEXT[], -- SEO keywords
    og_image TEXT -- Social media image
);

-- Election Races
CREATE TABLE election_races (
    id TEXT PRIMARY KEY,
    name JSONB NOT NULL, -- BilingualText
    type TEXT NOT NULL, -- 'presidential' | 'parliamentary' | 'local'
    total_votes INTEGER DEFAULT 0,
    reporting_percentage FLOAT DEFAULT 0,
    status TEXT NOT NULL, -- 'live' | 'final' | 'upcoming'
    last_updated TIMESTAMP WITH TIME ZONE NOT NULL
);

-- Candidates
CREATE TABLE candidates (
    id TEXT PRIMARY KEY,
    race_id TEXT REFERENCES election_races(id),
    name JSONB NOT NULL, -- BilingualText
    party JSONB NOT NULL, -- BilingualText
    party_color TEXT NOT NULL,
    photo TEXT NOT NULL,
    votes INTEGER DEFAULT 0,
    percentage FLOAT DEFAULT 0,
    bio JSONB, -- BilingualText
    is_winner BOOLEAN DEFAULT FALSE
);

-- Regions (for Electoral Maps)
CREATE TABLE regions (
    id TEXT NOT NULL, -- e.g., 'male', 'hulhumale' - not unique globally, so composite PK with race_id might be better, or just a surrogate key
    race_id TEXT REFERENCES election_races(id),
    name JSONB NOT NULL, -- BilingualText
    winner_id TEXT REFERENCES candidates(id),
    reporting_percentage FLOAT DEFAULT 0,
    votes JSONB NOT NULL, -- Map of candidateId -> votes
    PRIMARY KEY (id, race_id)
);

-- Indexes
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published_at ON articles(published_at);
CREATE INDEX idx_articles_scheduled_for ON articles(scheduled_for) WHERE scheduled_for IS NOT NULL;
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active);
CREATE INDEX idx_categories_order ON categories("order");
CREATE INDEX idx_candidates_race ON candidates(race_id);
CREATE INDEX idx_regions_race ON regions(race_id);
