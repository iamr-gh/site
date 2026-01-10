import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface Heading {
  id: string;
  text: string;
  level: number;
}

export function extractHeadingsFromMarkdown(markdown: string): Heading[] {
  const headings: Heading[] = [];
  
  // Match headings (## to ######) and capture the level and text
  const headingRegex = /^(#{2,6})\s+(.+)$/gm;
  let match;
  
  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length; // Number of # characters
    const text = match[2].trim();
    
    // Generate slug/id from the text (similar to rehype-slug behavior)
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '') // Remove special characters except spaces and hyphens
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single
      .trim();
    
    headings.push({ id, text, level });
  }
  
  return headings;
}
