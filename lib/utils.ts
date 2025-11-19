import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Removes approximation words from relative time strings
 * Strips words like "almost", "about", "over", etc.
 * @param timeString - The relative time string from formatDistanceToNow
 * @returns Cleaned time string without approximations
 */
export function removeTimeApproximations(timeString: string): string {
  return timeString
    .replace(/^almost\s+/i, '')
    .replace(/^about\s+/i, '')
    .replace(/^over\s+/i, '')
    .replace(/^around\s+/i, '')
    .replace(/^approximately\s+/i, '')
    .replace(/^nearly\s+/i, '')
    .replace(/\s+almost$/i, '')
    .replace(/\s+about$/i, '')
    .replace(/\s+over$/i, '')
    .trim();
}
