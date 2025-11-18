'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';
import { useUIStore } from '@/lib/stores/uiStore';
import { getTranslation } from '@/lib/translations';

export function Footer() {
  const { language } = useUIStore();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-muted/50 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold text-primary mb-4">
              News<span className="text-secondary">Hub</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {getTranslation('footer.description', language)}
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {getTranslation('footer.quickLinks', language)}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {getTranslation('footer.aboutUs', language)}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {getTranslation('footer.contact', language)}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {getTranslation('footer.privacy', language)}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {getTranslation('footer.terms', language)}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter (Placeholder) */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">
              {getTranslation('footer.stayUpdated', language)}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {getTranslation('footer.newsletter', language)}
            </p>
            <div className="text-xs text-muted-foreground">
              {getTranslation('footer.comingSoon', language)}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              © {currentYear} NewsHub. {getTranslation('footer.rights', language)}
            </p>
            <p className="text-sm text-muted-foreground mt-2 md:mt-0">
              {getTranslation('footer.builtWith', language)}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
