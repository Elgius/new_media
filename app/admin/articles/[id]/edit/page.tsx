'use client';

import dynamic from 'next/dynamic';

const ArticleEditor = dynamic(
  () => import('@/components/editor/ArticleEditor').then((mod) => ({ default: mod.ArticleEditor })),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading editor...</p>
        </div>
      </div>
    ),
  }
);

export default function EditArticlePage({ params: _params }: { params: Promise<{ id: string }> }) {
  // Note: params is a Promise in Next.js 15+, but for now we'll keep it simple
  // The ArticleEditor will need to be enhanced to handle edit mode
  return (
    <div>
      <ArticleEditor />
    </div>
  );
}
