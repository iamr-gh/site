// Category-based tag organization
export const categories = [
  {
    name: 'Languages',
    tags: ['rust', 'zig', 'csharp', 'typescript', 'python', 'javascript']
  },
  {
    name: 'Topics',
    tags: ['compilers', 'machine-learning', 'performance', 'optimization', 'systems-programming']
  },
  {
    name: 'Projects',
    tags: ['web-dev', 'game-dev', 'web-application', 'algorithms', 'data-structures']
  },
  {
    name: 'Tools',
    tags: ['astro', 'react', 'tailwindcss', 'shadcn', 'lucide-react']
  }
];

// Helper to get category for a tag
export function getCategoryForTag(tag) {
  for (const category of categories) {
    if (category.tags.includes(tag.toLowerCase())) {
      return category.name;
    }
  }
  return 'Other';
}