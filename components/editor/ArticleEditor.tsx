'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';
import { Article, BilingualText, Category } from '@/lib/types';
import { useArticleStore } from '@/lib/stores/articleStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RichTextEditor } from './RichTextEditor';
import { ImageUpload } from './ImageUpload';
import { CategorySelector } from './CategorySelector';
import { TagManager } from './TagManager';
import { ArticlePreview } from './ArticlePreview';
import { Save, Eye, FileText } from 'lucide-react';

type LanguageTab = 'en' | 'dv';

export function ArticleEditor() {
  const router = useRouter();
  const createArticle = useArticleStore((state) => state.createArticle);

  const [activeTab, setActiveTab] = useState<LanguageTab>('en');
  const [showPreview, setShowPreview] = useState(false);

  // Form state
  const [titleEn, setTitleEn] = useState('');
  const [titleDv, setTitleDv] = useState('');
  const [subtitleEn, setSubtitleEn] = useState('');
  const [subtitleDv, setSubtitleDv] = useState('');
  const [summaryEn, setSummaryEn] = useState('');
  const [summaryDv, setSummaryDv] = useState('');
  const [bodyEn, setBodyEn] = useState('');
  const [bodyDv, setBodyDv] = useState('');
  const [slug, setSlug] = useState('');
  const [autoSlug, setAutoSlug] = useState(true);
  const [authorEn, setAuthorEn] = useState('');
  const [authorDv, setAuthorDv] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [coverImage, setCoverImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [tags, setTags] = useState<BilingualText[]>([]);
  const [featured, setFeatured] = useState(false);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');

  // Auto-generate slug from English title
  useEffect(() => {
    if (autoSlug && titleEn) {
      setSlug(
        slugify(titleEn, {
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g,
        })
      );
    }
  }, [titleEn, autoSlug]);

  const handleSubmit = (publishNow: boolean) => {
    // Validation
    if (!titleEn.trim() || !titleDv.trim()) {
      alert('Please provide both English and Dhivehi titles');
      return;
    }
    if (!summaryEn.trim() || !summaryDv.trim()) {
      alert('Please provide both English and Dhivehi summaries');
      return;
    }
    if (!bodyEn.trim() || !bodyDv.trim()) {
      alert('Please provide both English and Dhivehi body content');
      return;
    }
    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }
    if (!coverImage.trim()) {
      alert('Please add a cover image');
      return;
    }
    if (!authorEn.trim() || !authorDv.trim()) {
      alert('Please provide both English and Dhivehi author names');
      return;
    }

    // Create article object
    // eslint-disable-next-line react-hooks/purity -- Event handler, not render function
    const articleId = `article-${Date.now()}`;
    // eslint-disable-next-line react-hooks/purity -- Event handler, not render function
    const authorId = `author-${Date.now()}`;

    // Create a temporary author object (will be replaced with proper author selection in Phase 2)
    const tempAuthor = {
      id: authorId,
      slug: slugify(authorEn, { lower: true, strict: true }),
      name: { en: authorEn, dv: authorDv },
      bio: { en: '', dv: '' },
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    };

    const newArticle: Article = {
      id: articleId,
      slug: slug || slugify(titleEn, { lower: true, strict: true }),
      title: { en: titleEn, dv: titleDv },
      subtitle: subtitleEn || subtitleDv ? { en: subtitleEn, dv: subtitleDv } : undefined,
      summary: { en: summaryEn, dv: summaryDv },
      body: { en: bodyEn, dv: bodyDv },
      coverImage,
      category: selectedCategory,
      author: tempAuthor,
      publishedAt: new Date(),
      featured,
      status: publishNow ? 'published' : 'draft',
      hasVideo: !!videoUrl,
      videoUrl: videoUrl || undefined,
      tags: tags.length > 0 ? tags : undefined,
    };

    // Add to store
    createArticle(newArticle);

    // Redirect
    if (publishNow) {
      router.push(`/article/${newArticle.slug}`);
    } else {
      alert('Article saved as draft!');
      // Reset form
      resetForm();
    }
  };

  const resetForm = () => {
    setTitleEn('');
    setTitleDv('');
    setSubtitleEn('');
    setSubtitleDv('');
    setSummaryEn('');
    setSummaryDv('');
    setBodyEn('');
    setBodyDv('');
    setSlug('');
    setAuthorEn('');
    setAuthorDv('');
    setSelectedCategory(null);
    setCoverImage('');
    setVideoUrl('');
    setTags([]);
    setFeatured(false);
    setAutoSlug(true);
  };

  // Preview article object
  const previewAuthor = authorEn
    ? {
        id: 'preview-author',
        slug: 'preview-author',
        name: { en: authorEn, dv: authorDv },
        bio: { en: '', dv: '' },
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
      }
    : undefined;

  const previewArticle: Partial<Article> = {
    title: { en: titleEn, dv: titleDv },
    subtitle: subtitleEn || subtitleDv ? { en: subtitleEn, dv: subtitleDv } : undefined,
    summary: { en: summaryEn, dv: summaryDv },
    body: { en: bodyEn, dv: bodyDv },
    coverImage,
    category: selectedCategory || undefined,
    author: previewAuthor,
    publishedAt: new Date(),
    hasVideo: !!videoUrl,
    videoUrl: videoUrl || undefined,
    tags: tags.length > 0 ? tags : undefined,
    status,
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Article Editor</h1>
          <p className="text-muted-foreground mt-1">Create a new article for your news website</p>
        </div>
        <Button variant="outline" onClick={() => setShowPreview(!showPreview)}>
          {showPreview ? <FileText className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
          {showPreview ? 'Edit' : 'Preview'}
        </Button>
      </div>

      {showPreview ? (
        /* Preview Mode */
        <Card>
          <CardContent className="pt-6">
            <ArticlePreview article={previewArticle} />
          </CardContent>
        </Card>
      ) : (
        /* Edit Mode */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Editor Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Language Tabs */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Button
                    variant={activeTab === 'en' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('en')}
                    className="flex-1"
                  >
                    English
                  </Button>
                  <Button
                    variant={activeTab === 'dv' ? 'default' : 'outline'}
                    onClick={() => setActiveTab('dv')}
                    className="flex-1"
                  >
                    Dhivehi
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {activeTab === 'en' ? (
                  <>
                    {/* English Fields */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title (English)</label>
                      <Input
                        type="text"
                        placeholder="Enter article title..."
                        value={titleEn}
                        onChange={(e) => setTitleEn(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subtitle (English, optional)</label>
                      <Input
                        type="text"
                        placeholder="Enter subtitle..."
                        value={subtitleEn}
                        onChange={(e) => setSubtitleEn(e.target.value)}
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Summary (English)</label>
                      <textarea
                        placeholder="Brief summary of the article..."
                        value={summaryEn}
                        onChange={(e) => setSummaryEn(e.target.value)}
                        className="w-full min-h-[100px] p-3 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Body (English)</label>
                      <RichTextEditor
                        content={bodyEn}
                        onChange={setBodyEn}
                        placeholder="Write your article content..."
                        direction="ltr"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Author (English)</label>
                      <Input
                        type="text"
                        placeholder="Author name..."
                        value={authorEn}
                        onChange={(e) => setAuthorEn(e.target.value)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Dhivehi Fields */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Title (Dhivehi)</label>
                      <Input
                        type="text"
                        placeholder="ލިޔުމުގެ ސުރުޚީ..."
                        value={titleDv}
                        onChange={(e) => setTitleDv(e.target.value)}
                        dir="rtl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subtitle (Dhivehi, optional)</label>
                      <Input
                        type="text"
                        placeholder="ފުށުލި ސުރުޚީ..."
                        value={subtitleDv}
                        onChange={(e) => setSubtitleDv(e.target.value)}
                        dir="rtl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Summary (Dhivehi)</label>
                      <textarea
                        placeholder="ލިޔުމުގެ ކުރު ޚުލާސާ..."
                        value={summaryDv}
                        onChange={(e) => setSummaryDv(e.target.value)}
                        className="w-full min-h-[100px] p-3 rounded-md border resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                        dir="rtl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Body (Dhivehi)</label>
                      <RichTextEditor
                        content={bodyDv}
                        onChange={setBodyDv}
                        placeholder="ލިޔުމުގެ ތަފްޞީލް..."
                        direction="rtl"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium">Author (Dhivehi)</label>
                      <Input
                        type="text"
                        placeholder="ލިޔުންތެރިޔާގެ ނަން..."
                        value={authorDv}
                        onChange={(e) => setAuthorDv(e.target.value)}
                        dir="rtl"
                      />
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Publish Card */}
            <Card>
              <CardHeader>
                <CardTitle>Publish</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={status === 'published' ? 'default' : 'secondary'}>
                    {status === 'published' ? 'Published' : 'Draft'}
                  </Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => {
                      setStatus('draft');
                      handleSubmit(false);
                    }}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Draft
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      setStatus('published');
                      handleSubmit(true);
                    }}
                  >
                    Publish
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Category Card */}
            <Card>
              <CardHeader>
                <CardTitle>Category</CardTitle>
              </CardHeader>
              <CardContent>
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                />
              </CardContent>
            </Card>

            {/* Slug Card */}
            <Card>
              <CardHeader>
                <CardTitle>URL Slug</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Input
                  type="text"
                  placeholder="article-url-slug"
                  value={slug}
                  onChange={(e) => {
                    setSlug(e.target.value);
                    setAutoSlug(false);
                  }}
                />
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="auto-slug"
                    checked={autoSlug}
                    onChange={(e) => setAutoSlug(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="auto-slug" className="text-sm text-muted-foreground cursor-pointer">
                    Auto-generate from title
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Image Card */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <ImageUpload imageUrl={coverImage} onImageChange={setCoverImage} />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Video URL (optional)</label>
                  <Input
                    type="url"
                    placeholder="https://youtube.com/embed/..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Tags Card */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
              </CardHeader>
              <CardContent>
                <TagManager tags={tags} onTagsChange={setTags} />
              </CardContent>
            </Card>

            {/* Options Card */}
            <Card>
              <CardHeader>
                <CardTitle>Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="featured" className="text-sm cursor-pointer">
                    Feature this article
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
