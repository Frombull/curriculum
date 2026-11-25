export type ExperienceItem = {
  key: 'experience4' | 'experience1' | 'experience3' | 'experience2';
  logo?: string;
};

export type ProjectItem = {
  key: 'project1' | 'project5' | 'project2' | 'project3' | 'project4';
  logo: string;
  githubUrl?: string;
  demoUrl?: string;
};

export type SkillCategory = 'frontend' | 'backend' | 'qa' | 'devops' | 'default';

export type SkillGroup = {
  key: 'frontend' | 'backend' | 'qaAndTesting' | 'devopsAndCloud' | 'designPatterns';
  dotColor: string;
  items: { label?: string; translationKey?: string; category: SkillCategory }[];
};

export const EXPERIENCES: ExperienceItem[] = [
  { key: 'experience4', logo: '/logos/SOIL_LOGO.webp' },
  { key: 'experience1', logo: '/logos/VBL_LOGO_2.png' },
  { key: 'experience3' },
  { key: 'experience2', logo: '/logos/WG_LOGO.jpg' },
];

export const PROJECTS: ProjectItem[] = [
  {
    key: 'project1',
    logo: '/logos/PIXELFORGE_LOGO.jpg',
    githubUrl: 'https://github.com/Frombull/PixelForge',
    demoUrl: 'https://pixelforge3d.com.br',
  },
  {
    key: 'project5',
    logo: '/logos/GROOVETREE_LOGO.jpg',
    githubUrl: 'https://github.com/Frombull/Groovetree',
    demoUrl: 'https://groovetr.ee',
  },
  {
    key: 'project2',
    logo: '/logos/ETE_LOGO.jpg',
    githubUrl: 'https://github.com/Frombull',
  },
  {
    key: 'project3',
    logo: '/logos/ETE_LOGO.jpg',
    githubUrl: 'https://github.com/Frombull',
  },
  {
    key: 'project4',
    logo: '/logos/ETE_LOGO.jpg',
    githubUrl: 'https://github.com/Frombull',
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    key: 'frontend',
    dotColor: 'bg-red-500',
    items: [
      { label: 'Blazor', category: 'frontend' },
      { label: 'React', category: 'frontend' },
      { label: 'Next.js', category: 'frontend' },
      { label: 'Tailwind CSS', category: 'frontend' },
      { label: 'JavaScript', category: 'frontend' },
      { label: 'TypeScript', category: 'frontend' },
    ],
  },
  {
    key: 'backend',
    dotColor: 'bg-green-500',
    items: [
      { label: 'C#', category: 'backend' },
      { label: 'NestJS', category: 'backend' },
      { label: 'Node.js', category: 'backend' },
      { label: 'PostgreSQL', category: 'backend' },
      { label: 'Prisma', category: 'backend' },
      { label: 'EF Core', category: 'backend' },
      { label: 'RabbitMQ', category: 'backend' },
      { label: 'ABP Framework', category: 'backend' },
      { label: 'Python', category: 'backend' },
      { label: 'SQL Server', category: 'backend' },
    ],
  },
  {
    key: 'qaAndTesting',
    dotColor: 'bg-blue-500',
    items: [
      { translationKey: 'skills.unitTesting', category: 'qa' },
      { label: 'Cypress', category: 'qa' },
      { label: 'Postman', category: 'qa' },
      { label: 'Selenium', category: 'qa' },
    ],
  },
  {
    key: 'devopsAndCloud',
    dotColor: 'bg-purple-500',
    items: [
      { label: 'AWS', category: 'devops' },
      { label: 'Terraform', category: 'devops' },
      { label: 'Docker', category: 'devops' },
      { label: 'GitHub Actions', category: 'devops' },
      { label: 'Azure', category: 'devops' },
    ],
  },
  {
    key: 'designPatterns',
    dotColor: 'bg-gray-500',
    items: [
      { label: 'DDD', category: 'default' },
      { label: 'Clean Architecture', category: 'default' },
      { label: 'MVC', category: 'default' },
      { label: 'RESTful APIs', category: 'default' },
      { label: 'MQTT', category: 'default' },
      { label: 'Scrum/Kanban', category: 'default' },
      { label: 'Git', category: 'default' },
    ],
  },
];

export const EDUCATIONS = ['education1', 'education2'] as const;
export const CERTIFICATES = ['certificate1', 'certificate2'] as const;
