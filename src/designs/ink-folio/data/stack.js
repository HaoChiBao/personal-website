const stack = [
  { name: 'JavaScript', group: 'frontend' },
  { name: 'TypeScript', group: 'frontend' },
  { name: 'React', group: 'frontend' },
  { name: 'HTML/CSS', group: 'frontend' },
  { name: 'Java', group: 'backend' },
  { name: 'Spring Boot', group: 'backend' },
  { name: 'Python', group: 'backend' },
  { name: 'SQL', group: 'backend' },
  { name: 'GraphQL', group: 'backend' },
  { name: 'Supabase', group: 'backend' },
  { name: 'Chrome Ext', group: 'tools' },
  { name: 'Railway', group: 'tools' },
  { name: 'Git', group: 'tools' },
  { name: 'Figma', group: 'design' },
  { name: 'Framer Motion', group: 'frontend' },
  { name: 'LLMs', group: 'tools' },
];

export const stackFilters = [
  { id: 'all', label: 'All' },
  { id: 'frontend', label: 'Frontend' },
  { id: 'backend', label: 'Backend' },
  { id: 'design', label: 'Design' },
  { id: 'tools', label: 'Tools' },
];

export default stack;
