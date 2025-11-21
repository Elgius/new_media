-- Seed Categories
INSERT INTO categories (id, name, slug, color, parent_id, "order", is_active, is_special) VALUES
('1', '{"en": "Politics", "dv": "ސިޔާސަތު"}', 'politics', '#0F8A2F', NULL, 1, true, false),
('2', '{"en": "Sports", "dv": "ކުޅިވަރު"}', 'sports', '#40B657', NULL, 2, true, false),
('3', '{"en": "Business", "dv": "ވިޔަފާރި"}', 'business', '#1A5D2F', NULL, 3, true, false),
('4', '{"en": "Local", "dv": "ލޯކަލް"}', 'local', '#2DA84A', NULL, 4, true, false);

-- Seed Authors
INSERT INTO authors (id, slug, name, bio, photo, social_links) VALUES
('1', 'sarah-johnson', '{"en": "Sarah Johnson", "dv": "ސާރާ ޖޮންސަން"}', '{"en": "Sarah Johnson is a senior political correspondent...", "dv": "ސާރާ ޖޮންސަން އަކީ..."}', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', '{"twitter": "https://twitter.com/sarahjohnson", "email": "sarah.johnson@newshub.com"}'),
('2', 'ahmed-rahman', '{"en": "Ahmed Rahman", "dv": "އަހްމަދު ރަހްމާން"}', '{"en": "Ahmed Rahman is a sports journalist...", "dv": "އަހްމަދު ރަހްމާން އަކީ..."}', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', '{"twitter": "https://twitter.com/ahmedrahman"}'),
('3', 'michael-chen', '{"en": "Michael Chen", "dv": "މައިކަލް ޗެން"}', '{"en": "Michael Chen specializes in business...", "dv": "މައިކަލް ޗެން އަކީ..."}', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', '{"twitter": "https://twitter.com/michaelchen"}'),
('4', 'jennifer-williams', '{"en": "Jennifer Williams", "dv": "ޖެނިފަރ ވިލިއަމްސް"}', '{"en": "Jennifer Williams is a community reporter...", "dv": "ޖެނިފަރ ވިލިއަމްސް އަކީ..."}', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', '{"twitter": "https://twitter.com/jenniferwilliams"}'),
('5', 'robert-taylor', '{"en": "Robert Taylor", "dv": "ރޮބަރޓް ޓޭލާ"}', '{"en": "Robert Taylor covers the business beat...", "dv": "ރޮބަރޓް ޓޭލާ އަކީ..."}', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', '{"twitter": "https://twitter.com/roberttaylor"}');

-- Seed Articles
INSERT INTO articles (id, slug, title, subtitle, summary, body, cover_image, category_id, author_id, published_at, featured, tags, related_article_ids) VALUES
('1', 'parliament-passes-historic-climate-bill', 
 '{"en": "Parliament Passes Historic Climate Change Bill", "dv": "މަޖިލީހުން މޫސުމީ ބަދަލުތަކާ ބެހޭ ތާރީޚީ ގާނޫނެއް ފާސްކޮށްފި"}',
 '{"en": "New legislation sets ambitious targets...", "dv": "2040 ވަނަ އަހަރަށް..."}',
 '{"en": "In a landmark decision...", "dv": "މަޖިލީހުން އިއްތިފާގުން..."}',
 '{"en": "<p>In a historic vote today...</p>", "dv": "<p>މިއަދު މަޖިލީހުން...</p>"}',
 'https://images.unsplash.com/photo-1473496169904-658ba7c44d8a?w=1200',
 '1', '1', '2024-01-15T10:30:00Z', true,
 '[{"en": "climate", "dv": "މޫސުން"}, {"en": "legislation", "dv": "ގާނޫނު"}]',
 ARRAY['2', '4']
),
('2', 'national-team-advances-championship',
 '{"en": "National Team Advances to Championship Finals", "dv": "ގައުމީ ޓީމު ޗެމްޕިއަންޝިޕް ފައިނަލަށް ދަތުރުކޮށްފި"}',
 '{"en": "Thrilling victory...", "dv": "ސަރަހައްދީ މުބާރާތުގެ..."}',
 '{"en": "The national football team...", "dv": "ގައުމީ ފުޓްބޯޅަ ޓީމު..."}',
 '{"en": "<p>In an electrifying match...</p>", "dv": "<p>ފޭނުން ހަމަހިމޭންކޮށްލި...</p>"}',
 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=1200',
 '2', '2', '2024-01-14T20:15:00Z', true,
 '[{"en": "football", "dv": "ފުޓްބޯޅަ"}, {"en": "sports", "dv": "ކުޅިވަރު"}]',
 ARRAY['7']
),
('3', 'tech-sector-shows-strong-growth',
 '{"en": "Technology Sector Shows Strong Growth This Quarter", "dv": "އިތުރު ގަ ވިޔަފާރި..."}',
 '{"en": "Local tech companies...", "dv": "ތިކުދަ ޓެކްނޮލޮޖީ..."}',
 '{"en": "The technology sector...", "dv": "ވިޔަފާރި ވަނަ..."}',
 '{"en": "<p>The local technology sector...</p>", "dv": "<p>ތިކުދަ ޓެކްނޮލޮޖީ..."}',
 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200',
 '3', '3', '2024-01-14T09:00:00Z', true,
 '[{"en": "technology", "dv": "ޓެކްނޮލޮޖީ"}, {"en": "business", "dv": "ވިޔަފާރި"}]',
 ARRAY['5']
),
('4', 'new-community-center-opens',
 '{"en": "New Community Center Opens in Capital City", "dv": "ސާތްދާ ޓାވުގައި..."}',
 '{"en": "State-of-the-art facility...", "dv": "ވަރާސް ރަނގަޅު..."}',
 '{"en": "A modern community center...", "dv": "ކުޅިވަރުވަނަ އިފާދާ..."}',
 '{"en": "<p>The new Capital Community Center...</p>", "dv": "<p>ނވަ ސާތްދާ..."}',
 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200',
 '4', '4', '2024-01-13T14:30:00Z', false,
 '[{"en": "community", "dv": "ކުވެރިކަމަ"}]',
 ARRAY['8']
),
('5', 'startup-raises-million-funding',
 '{"en": "Local Startup Raises $10 Million in Series A Funding", "dv": "ތިކުދަ ސްޓާރޓަޕ..."}',
 '{"en": "AI-powered platform...", "dv": "އް ތި ނިވާ..."}',
 '{"en": "TechStartup Inc....", "dv": "ޓެކްސްޓާރޓަޕ އިނކ...."}' ,
 '{"en": "<p>TechStartup Inc....</p>", "dv": "<p>ޓެކްސްޓާރޓަޕ އިނކ...."}' ,
 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200',
 '3', '5', '2024-01-13T11:00:00Z', false,
 '[{"en": "startup", "dv": "ސްޓާރޓަޕ"}]',
 ARRAY['3']
),
('6', 'education-reform-proposal-unveiled',
 '{"en": "Education Minister Unveils Comprehensive Reform Proposal", "dv": "ޝިކުވާތީ މިނިސްޓަރ..."}',
 '{"en": "New initiative focuses...", "dv": "ނވަ ކަމ ސްޓެމ..."}',
 '{"en": "The Ministry of Education...", "dv": "ޝިކުވާތީ ވަގުތުވެ..."}',
 '{"en": "<p>Education Minister Dr. Fatima Hassan...</p>", "dv": "<p>ޝިކުވާތީ މިނިސްޓަރ..."}',
 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200',
 '1', '1', '2024-01-12T13:45:00Z', false,
 '[{"en": "education", "dv": "ޝިކުވާ"}]',
 ARRAY['1']
),
('7', 'olympic-hopeful-breaks-national-record',
 '{"en": "Olympic Hopeful Breaks National Swimming Record", "dv": "ހިނދުހަގވަާ ނިވާ..."}',
 '{"en": "Young athlete sets...", "dv": "ދިރިވަސް ކޮޅި..."}',
 '{"en": "Eighteen-year-old swimming...", "dv": "18 އަހަރުގެ..."}',
 '{"en": "<p>In a stunning display...</p>", "dv": "<p>ވަރުގަދަ ވިޔަތި..."}',
 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=1200',
 '2', '2', '2024-01-12T18:20:00Z', false,
 '[{"en": "swimming", "dv": "ވާވަގި"}]',
 ARRAY['2']
),
('8', 'local-artists-showcase-exhibition',
 '{"en": "Local Artists Showcase Work in Downtown Exhibition", "dv": "ތިކުދަ އާރިސްޓްި..."}',
 '{"en": "Month-long exhibition...", "dv": "މަހުވެ ދިއްސާ..."}',
 '{"en": "The Downtown Arts Gallery...", "dv": "ވިޔަފާރި ސިނިމާ..."}',
 '{"en": "<p>The Downtown Arts Gallery...</p>", "dv": "<p>ވިޔަފާރި ސިނިމާ..."}',
 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=1200',
 '4', '4', '2024-01-11T10:00:00Z', false,
 '[{"en": "arts", "dv": "އާރްޓް"}]',
 ARRAY['4']
);

-- Seed Election Races
INSERT INTO election_races (id, name, type, total_votes, reporting_percentage, status, last_updated) VALUES
('presidential-2024', '{"en": "Presidential Election 2024", "dv": "2024 ރިޔާސީ އިންތިހާބު"}', 'presidential', 150000, 75, 'live', '2024-11-18T14:30:00Z'),
('parliamentary-male-2024', '{"en": "Male'' Central Parliamentary Seat", "dv": "މާލެ މެދު ރައްޔިތުންގެ މަޖިލިސް ގޮނޑި"}', 'parliamentary', 12400, 92, 'live', '2024-11-18T14:45:00Z'),
('local-hulhumale-2024', '{"en": "Hulhumale'' Local Council", "dv": "ހުޅުމާލެ ލޯކަލް ކައުންސިލް"}', 'local', 4380, 100, 'final', '2024-11-18T15:00:00Z');

-- Seed Candidates
INSERT INTO candidates (id, race_id, name, party, party_color, photo, votes, percentage, bio, is_winner) VALUES
-- Presidential
('candidate-1', 'presidential-2024', '{"en": "Ahmed Mohamed", "dv": "އަހްމަދު މުހައްމަދު"}', '{"en": "Progressive Party", "dv": "ޕްރޮގްރެސިވް ޕާޓީ"}', '#DC2626', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400', 67500, 45, '{"en": "Experienced leader...", "dv": "..."}', true),
('candidate-2', 'presidential-2024', '{"en": "Fatima Hassan", "dv": "ފާޠިމާ ހަސަން"}', '{"en": "Democratic Alliance", "dv": "ޑިމޮކްރެޓިކް އެލަޔަންސް"}', '#2563EB', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400', 52500, 35, '{"en": "Former Minister...", "dv": "..."}', false),
('candidate-3', 'presidential-2024', '{"en": "Ibrahim Ali", "dv": "އިބްރާހީމް ޢަލީ"}', '{"en": "Reform Movement", "dv": "ރިފޯމް މޫވްމަންޓް"}', '#059669', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400', 30000, 20, '{"en": "Businessman...", "dv": "..."}', false),

-- Parliamentary
('mp-1', 'parliamentary-male-2024', '{"en": "Mohamed Rasheed", "dv": "މުހައްމަދު ރަޝީދު"}', '{"en": "Progressive Party", "dv": "ޕްރޮގްރެސިވް ޕާޓީ"}', '#DC2626', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400', 5200, 42, '{"en": "Incumbent MP...", "dv": "..."}', true),
('mp-2', 'parliamentary-male-2024', '{"en": "Aisha Ibrahim", "dv": "ޢާއިޝާ އިބްރާހީމް"}', '{"en": "Democratic Alliance", "dv": "ޑިމޮކްރެޓިކް އެލަޔަންސް"}', '#2563EB', 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400', 4500, 36, '{"en": "Community organizer...", "dv": "..."}', false),
('mp-3', 'parliamentary-male-2024', '{"en": "Hassan Saeed", "dv": "ހަސަން ސަޢީދު"}', '{"en": "Independent", "dv": "އިސްތިގުލާލް"}', '#6B7280', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400', 2700, 22, '{"en": "Independent candidate...", "dv": "..."}', false),

-- Local
('local-1', 'local-hulhumale-2024', '{"en": "Aminath Shauna", "dv": "އާމިނަތު ޝައުނާ"}', '{"en": "Progressive Party", "dv": "ޕްރޮގްރެސިވް ޕާޓީ"}', '#DC2626', 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400', 2100, 48, '{"en": "Youth leader...", "dv": "..."}', true),
('local-2', 'local-hulhumale-2024', '{"en": "Ali Fazeel", "dv": "ޢަލީ ފާޟިލް"}', '{"en": "Democratic Alliance", "dv": "ޑިމޮކްރެޓިކް އެލަޔަންސް"}', '#2563EB', 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400', 1800, 41, '{"en": "Business owner...", "dv": "..."}', false),
('local-3', 'local-hulhumale-2024', '{"en": "Mariyam Naseema", "dv": "މަރިޔަމް ނަސީމާ"}', '{"en": "Independent", "dv": "އިސްތިގުލާލް"}', '#6B7280', 'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400', 480, 11, '{"en": "Teacher...", "dv": "..."}', false);

-- Seed Regions (Presidential Map)
INSERT INTO regions (id, race_id, name, winner_id, reporting_percentage, votes) VALUES
('male', 'presidential-2024', '{"en": "Male'' City", "dv": "މާލެ ސިޓީ"}', 'candidate-1', 100, '{"candidate-1": 25000, "candidate-2": 18000, "candidate-3": 7000}'),
('hulhumale', 'presidential-2024', '{"en": "Hulhumale''", "dv": "ހުޅުމާލެ"}', 'candidate-1', 100, '{"candidate-1": 12000, "candidate-2": 9500, "candidate-3": 5500}'),
('vilimale', 'presidential-2024', '{"en": "Vilimale''", "dv": "ވިލިމާލެ"}', 'candidate-2', 100, '{"candidate-1": 4500, "candidate-2": 6500, "candidate-3": 2000}'),
('addu', 'presidential-2024', '{"en": "Addu City", "dv": "އައްޑޫ ސިޓީ"}', 'candidate-2', 85, '{"candidate-1": 8000, "candidate-2": 11000, "candidate-3": 4500}'),
('north', 'presidential-2024', '{"en": "Northern Atolls", "dv": "އުތުރުގެ އަތޮޅުތައް"}', 'candidate-1', 65, '{"candidate-1": 15000, "candidate-2": 7500, "candidate-3": 8500}'),
('central', 'presidential-2024', '{"en": "Central Atolls", "dv": "މެދުގެ އަތޮޅުތައް"}', 'candidate-3', 70, '{"candidate-1": 3000, "candidate-2": 0, "candidate-3": 2500}'),
('south', 'presidential-2024', '{"en": "Southern Atolls", "dv": "ދެކުނުގެ އަތޮޅުތައް"}', NULL, 45, '{"candidate-1": 0, "candidate-2": 0, "candidate-3": 0}');
