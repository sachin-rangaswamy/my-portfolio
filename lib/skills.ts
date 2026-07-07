export type SkillCategory =
  | 'electronic'
  | 'atomistic'
  | 'thermo'
  | 'continuum'
  | 'data';

export interface Skill {
  name: string;
  category: SkillCategory;
}

export const CATEGORY_COLORS: Record<SkillCategory, string> = {
  electronic: '#6c63ff',
  atomistic: '#00d4e0',
  thermo: '#00f5d4',
  continuum: '#a8e063',
  data: '#ffd166',
};

export const SKILLS: Skill[] = [
  { name: 'DFT', category: 'electronic' },
  { name: 'EMTO-CPA', category: 'electronic' },
  { name: 'VASP', category: 'electronic' },
  { name: 'MLIPs', category: 'atomistic' },
  { name: 'Molecular Dynamics', category: 'atomistic' },
  { name: 'LAMMPS', category: 'atomistic' },
  { name: 'CALPHAD', category: 'thermo' },
  { name: 'Phase-field', category: 'thermo' },
  { name: 'Kinetics', category: 'thermo' },
  { name: 'Thermo-Calc', category: 'thermo' },
  { name: 'FEM', category: 'continuum' },
  { name: 'CFD', category: 'continuum' },
  { name: 'Python', category: 'data' },
  { name: 'Machine Learning', category: 'data' },
];
