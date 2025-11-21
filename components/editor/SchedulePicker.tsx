'use client';

import { useState } from 'react';
import { format } from 'date-fns';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Clock, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SchedulePickerProps {
  scheduledDate?: Date;
  onScheduleChange: (date: Date | undefined) => void;
}

export function SchedulePicker({ scheduledDate, onScheduleChange }: SchedulePickerProps) {
  const [date, setDate] = useState<Date | undefined>(scheduledDate);
  const [time, setTime] = useState<string>(
    scheduledDate ? format(scheduledDate, 'HH:mm') : '09:00'
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const handleApply = () => {
    if (date) {
      const [hours, minutes] = time.split(':').map(Number);
      const scheduledDateTime = new Date(date);
      scheduledDateTime.setHours(hours, minutes, 0, 0);
      onScheduleChange(scheduledDateTime);
      setIsOpen(false);
    }
  };

  const handleClear = () => {
    setDate(undefined);
    setTime('09:00');
    onScheduleChange(undefined);
    setIsOpen(false);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Schedule Publication</label>
      <div className="flex gap-2">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                'flex-1 justify-start text-left font-normal',
                !scheduledDate && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {scheduledDate ? (
                format(scheduledDate, 'PPP \'at\' p')
              ) : (
                <span>Pick a date and time</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <div className="space-y-4 p-4">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                initialFocus
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
              />
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Time
                </label>
                <Input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleApply} disabled={!date} className="flex-1">
                  Apply
                </Button>
                <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
                  Cancel
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {scheduledDate && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleClear}
            title="Clear schedule"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {scheduledDate && (
        <p className="text-xs text-muted-foreground">
          Article will be published on {format(scheduledDate, 'PPPP \'at\' p')}
        </p>
      )}
    </div>
  );
}
