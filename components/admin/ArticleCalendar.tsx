'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Article } from '@/lib/types';
import { useArticleStore } from '@/lib/stores/articleStore';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, Tag, Clock } from 'lucide-react';

interface ArticleCalendarProps {
  articles: Article[];
}

export function ArticleCalendar({ articles }: ArticleCalendarProps) {
  const router = useRouter();
  const updateArticle = useArticleStore((state) => state.updateArticle);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedDayArticles, setSelectedDayArticles] = useState<Article[]>([]);

  // Convert articles to calendar events
  const events = articles.map((article) => {
    const displayDate = article.scheduledFor || article.publishedAt;

    return {
      id: article.id,
      title: article.title.en,
      start: displayDate,
      backgroundColor: article.category.color,
      borderColor: article.category.color,
      extendedProps: {
        status: article.status,
        category: article.category.name.en,
        slug: article.slug,
      },
    };
  });

  const handleEventClick = (info: { event: { id: string } }) => {
    router.push(`/admin/articles/${info.event.id}/edit`);
  };

  const handleEventDrop = (info: { event: { id: string; start: Date | null }; revert: () => void }) => {
    const articleId = info.event.id;
    const newDate = info.event.start;

    if (!newDate) {
      info.revert();
      return;
    }

    if (confirm(`Reschedule article to ${newDate.toLocaleDateString()}?`)) {
      updateArticle(articleId, {
        scheduledFor: newDate,
        status: 'scheduled',
      });
    } else {
      info.revert();
    }
  };

  const handleDateClick = (info: { date: Date; dateStr: string }) => {
    const clickedDate = info.date;

    // Filter articles for this specific day
    const articlesOnDay = articles.filter((article) => {
      const displayDate = article.scheduledFor || article.publishedAt;
      if (!displayDate) return false;

      const articleDate = new Date(displayDate);
      return (
        articleDate.getFullYear() === clickedDate.getFullYear() &&
        articleDate.getMonth() === clickedDate.getMonth() &&
        articleDate.getDate() === clickedDate.getDate()
      );
    });

    setSelectedDate(clickedDate);
    setSelectedDayArticles(articlesOnDay);
    setIsDialogOpen(true);
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <style jsx global>{`
        .fc {
          --fc-border-color: hsl(var(--border));
          --fc-button-bg-color: hsl(var(--primary));
          --fc-button-border-color: hsl(var(--primary));
          --fc-button-hover-bg-color: hsl(var(--primary) / 0.9);
          --fc-button-hover-border-color: hsl(var(--primary) / 0.9);
          --fc-button-active-bg-color: hsl(var(--primary) / 0.8);
          --fc-button-active-border-color: hsl(var(--primary) / 0.8);
          --fc-today-bg-color: hsl(var(--muted));
        }

        .fc .fc-button {
          text-transform: capitalize;
          font-weight: 500;
          font-size: 0.875rem;
          padding: 0.5rem 1rem;
        }

        .fc .fc-button-primary:not(:disabled).fc-button-active,
        .fc .fc-button-primary:not(:disabled):active {
          background-color: hsl(var(--primary));
          border-color: hsl(var(--primary));
        }

        .fc .fc-toolbar-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: hsl(var(--foreground));
        }

        .fc .fc-col-header-cell {
          background-color: hsl(var(--muted) / 0.5);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.75rem;
          padding: 0.75rem 0;
        }

        .fc .fc-daygrid-day-number {
          color: hsl(var(--foreground));
          padding: 0.5rem;
          font-weight: 500;
        }

        .fc .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
          background-color: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border-radius: 50%;
          width: 2rem;
          height: 2rem;
          display: flex;
          align-items: center;
          justify-center;
        }

        .fc .fc-event {
          cursor: pointer;
          border-radius: 0.25rem;
          padding: 0.25rem 0.5rem;
          font-size: 0.813rem;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .fc .fc-event:hover {
          opacity: 0.9;
        }

        .fc .fc-daygrid-event-dot {
          display: none;
        }

        .fc-theme-standard td,
        .fc-theme-standard th {
          border-color: hsl(var(--border));
        }

        .fc-theme-standard .fc-scrollgrid {
          border-color: hsl(var(--border));
        }
      `}</style>

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        events={events}
        editable={true}
        droppable={true}
        eventClick={handleEventClick}
        eventDrop={handleEventDrop}
        dateClick={handleDateClick}
        height="auto"
        eventDisplay="block"
        displayEventTime={false}
        dayMaxEvents={3}
        moreLinkText={(num) => `+${num} more`}
      />

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              {selectedDate?.toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </DialogTitle>
            <DialogDescription>
              {selectedDayArticles.length === 0
                ? 'No articles scheduled for this day'
                : `${selectedDayArticles.length} article${selectedDayArticles.length > 1 ? 's' : ''} scheduled`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {selectedDayArticles.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <p>No articles scheduled for this day.</p>
                <Button
                  className="mt-4"
                  onClick={() => {
                    setIsDialogOpen(false);
                    router.push('/admin/articles/new');
                  }}
                >
                  Create New Article
                </Button>
              </div>
            ) : (
              selectedDayArticles.map((article) => (
                <div
                  key={article.id}
                  className="border rounded-lg p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">
                        {article.title.en}
                      </h3>
                      {article.title.dv && (
                        <p className="text-sm text-muted-foreground" dir="rtl">
                          {article.title.dv}
                        </p>
                      )}
                    </div>
                    <Badge
                      variant={
                        article.status === 'published'
                          ? 'default'
                          : article.status === 'scheduled'
                          ? 'secondary'
                          : 'outline'
                      }
                    >
                      {article.status}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Tag className="h-4 w-4" />
                      <span
                        className="px-2 py-0.5 rounded"
                        style={{ backgroundColor: article.category.color }}
                      >
                        {article.category.name.en}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <User className="h-4 w-4" />
                      <span>{article.author.name.en}</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>
                        {article.scheduledFor
                          ? `Scheduled: ${new Date(article.scheduledFor).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}`
                          : `Published: ${new Date(article.publishedAt!).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}`}
                      </span>
                    </div>
                  </div>

                  {article.summary?.en && (
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {article.summary.en}
                    </p>
                  )}

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setIsDialogOpen(false);
                        router.push(`/admin/articles/${article.id}/edit`);
                      }}
                    >
                      Edit Article
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setIsDialogOpen(false);
                        router.push(`/article/${article.slug}`);
                      }}
                    >
                      Preview
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
