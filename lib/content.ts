import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface ProjectMeta {
  slug: string;
  title: string;
  summary: string;
  problem: string;
  methodology: string;
  tools: string[];
  outcomes: string;
  scales: string[];
  featured: boolean;
  order: number;
}

export interface Project extends ProjectMeta {
  body: string;
}

const PROJECTS_DIR = path.join(process.cwd(), 'content', 'projects');

export function getAllProjects(): ProjectMeta[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((f) => f.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, file), 'utf-8');
      const { data } = matter(raw);
      return { slug, ...(data as Omit<ProjectMeta, 'slug'>) };
    })
    .sort((a, b) => a.order - b.order);
}

export function getProject(slug: string): Project | null {
  const file = path.join(PROJECTS_DIR, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, 'utf-8');
  const { data, content } = matter(raw);
  return { slug, ...(data as Omit<ProjectMeta, 'slug'>), body: content };
}
