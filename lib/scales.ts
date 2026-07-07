export type ScaleKey =
  | 'quantum'
  | 'disorder'
  | 'atomistic'
  | 'micro'
  | 'continuum'
  | 'engineering';

export interface ScaleDef {
  key: ScaleKey;
  /** Accent color for the node and its visual */
  color: string;
  /** KaTeX source strings */
  equations: string[];
  /** Software / method tools (proper nouns, not translated) */
  tools: string[];
  /** Approximate position on the length-scale axis, for the ruler */
  ruler: string;
}

/**
 * Structural definition of the six scales of the Scale Bridge.
 * All human-readable text lives in messages/{locale}.json under `scales.items.<key>`.
 */
export const SCALES: ScaleDef[] = [
  {
    key: 'quantum',
    color: '#6c63ff',
    equations: ['\\hat{H}\\,\\psi = E\\,\\psi'],
    tools: ['VASP', 'MedeA', 'Post-Hartree–Fock'],
    ruler: '10⁻¹⁰ m',
  },
  {
    key: 'disorder',
    color: '#8a7bff',
    equations: ['\\bar{g}(z) = \\textstyle\\sum_i c_i\\, g_i(z)'],
    tools: ['EMTO', 'CPA', 'Special Quasirandom Structures'],
    ruler: '10⁻⁹ m',
  },
  {
    key: 'atomistic',
    color: '#00d4e0',
    equations: [
      '\\mathbf{F} = m\\,\\mathbf{a}',
      '\\mathbf{r}(t{+}\\Delta t) = 2\\mathbf{r}(t) - \\mathbf{r}(t{-}\\Delta t) + \\mathbf{a}(t)\\,\\Delta t^{2}',
    ],
    tools: ['LAMMPS', 'MLIPs', 'Kinetic Monte Carlo'],
    ruler: '10⁻⁸ m',
  },
  {
    key: 'micro',
    color: '#00f5d4',
    equations: [
      'G = \\textstyle\\sum_i x_i\\,{}^{0}G_i + RT\\sum_i x_i \\ln x_i + G^{\\mathrm{ex}}',
      '\\frac{\\partial \\varphi}{\\partial t} = -M\\,\\frac{\\delta F}{\\delta \\varphi}',
    ],
    tools: ['Thermo-Calc', 'pycalphad', 'TC-PRISMA'],
    ruler: '10⁻⁶ m',
  },
  {
    key: 'continuum',
    color: '#a8e063',
    equations: ['\\nabla \\cdot \\mathbf{u} = 0'],
    tools: ['ANSYS Fluent', 'COMSOL Multiphysics'],
    ruler: '10⁻³ m',
  },
  {
    key: 'engineering',
    color: '#ffd166',
    equations: ['[K]\\,\\{u\\} = \\{F\\}'],
    tools: ['ANSYS', 'DAMASK', 'MATLAB/Simulink'],
    ruler: '10⁰ m',
  },
];
