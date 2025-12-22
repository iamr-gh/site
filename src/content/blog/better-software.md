---
title: 'Better Software, Faster'
pubDate: 2025-12-22
description: 'My goals for all software I write.'
author: 'Ibrahim Musaddequr Rahman'
tags: ['meta']
---

# Better Software, Faster

I have recently started a [new blog](/blog/hello-world), as a place to showcase and store various projects of mine. As such, I am starting with my goals for all software I write.

## Portability

## Performance
Modern compilers and hardware are very fast. If anything does not load instantly, there should be a good justification for why.

Things that should be fast(instantaneous) and responsive:
- website content
- cli tools

Things that can be slow:
- Machine learning tasks
- Intensive live graphics
- Complex tasks

## AI Usage
My standard for all AI usage is it should not be noticable. 
If AI is used on a project, it should be up to basic humans standards. 
This is most notable in writing, but applies to code as well.

## Example Code

Here's some sample code to demonstrate syntax highlighting:

```javascript
// Function to calculate reading time
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).filter(word => word.length > 0).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return minutes;
}

// Usage example
const sampleText = "This is a sample text for reading time calculation.";
const readingTime = calculateReadingTime(sampleText);
console.log(`Reading time: ${readingTime} minutes`);
```

```typescript
interface BlogPost {
  title: string;
  content: string;
  author: string;
  publishDate: Date;
  tags: string[];
}

const posts: BlogPost[] = [
  {
    title: "Example Post",
    content: "Sample content here...",
    author: "Developer",
    publishDate: new Date(),
    tags: ["typescript", "programming"]
  }
];
```
