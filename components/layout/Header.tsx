'use client';

import Link from 'next/link';
import { Search, Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useArticleStore } from '@/lib/stores/articleStore';
import { useUIStore, LANGUAGES } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';
import { useState, useEffect } from 'react';

export function Header() {
  const { categories } = useArticleStore();
  const { mobileMenuOpen, searchOpen, toggleMobileMenu, toggleSearch, closeMobileMenu, language, setLanguage } =
    useUIStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering language-dependent content after mount
  // This is an acceptable use of setState in useEffect for hydration handling
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language.code === 'en' ? LANGUAGES.dv : LANGUAGES.en);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement search navigation
    console.log('Search:', searchQuery);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold text-primary">
              News<span className="text-secondary">Hub</span>
            </div>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="search"
                placeholder={mounted ? getTranslation('header.search', language) : 'Search news...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" variant="default" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleLanguage}
              className="flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              <span className="text-sm font-medium" suppressHydrationWarning>
                {mounted ? (language.code === 'en' ? 'DV' : 'EN') : 'DV'}
              </span>
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        {searchOpen && (
          <div className="mt-3 md:hidden">
            <form onSubmit={handleSearch} className="flex w-full">
              <Input
                type="search"
                placeholder={mounted ? getTranslation('header.search', language) : 'Search news...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-r-none"
              />
              <Button type="submit" variant="default" className="rounded-l-none">
                <Search className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}
      </div>

      {/* Navigation Categories */}
      <nav className="border-t hidden md:block">
        <div className="container mx-auto px-4">
          <ul className="flex items-center space-x-8 py-3">
            <li>
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1"
              >
                <span suppressHydrationWarning>
                  {mounted ? getTranslation('header.home', language) : 'Home'}
                </span>
              </Link>
            </li>
            <li>
              <Link
                href="/elections"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1"
              >
                <span suppressHydrationWarning>
                  {mounted ? getTranslation('header.elections', language) : 'Elections'}
                </span>
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/category/${category.slug}`}
                  className="text-sm font-medium text-foreground hover:text-primary transition-colors border-b-2 border-transparent hover:border-primary pb-1"
                >
                  {typeof category.name === 'object'
                    ? category.name[language.code as keyof typeof category.name]
                    : category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-white">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  onClick={closeMobileMenu}
                  className="block py-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span suppressHydrationWarning>
                    {mounted ? getTranslation('header.home', language) : 'Home'}
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/elections"
                  onClick={closeMobileMenu}
                  className="block py-2 text-sm font-medium text-foreground hover:text-primary"
                >
                  <span suppressHydrationWarning>
                    {mounted ? getTranslation('header.elections', language) : 'Elections'}
                  </span>
                </Link>
              </li>
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    onClick={closeMobileMenu}
                    className="block py-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    {typeof category.name === 'object'
                      ? category.name[language.code as keyof typeof category.name]
                      : category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
