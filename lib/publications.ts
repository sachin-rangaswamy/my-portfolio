export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  year: number;
  doi?: string;
  abstract?: string;
  status: 'published' | 'in-preparation';
  tags: string[];
}

/**
 * NOTE: Replace/extend these entries as manuscripts are published.
 * Entries with status 'in-preparation' render with an "in preparation" badge
 * instead of a DOI link.
 */
export const PUBLICATIONS: Publication[] = [
  {
    id: 'aim-2026',
    title:
      'AI-guided computational materials design for sustainable manufacturing: coupling CALPHAD thermodynamics with kinetic simulations',
    authors: 'S. Rangaswamy, E. Kabliman et al.',
    venue: 'Manuscript in preparation',
    year: 2026,
    status: 'in-preparation',
    abstract:
      'Doctoral work within the AIM project at Leibniz IWT: physically interpretable machine-learning workflows that integrate electronic-structure concepts, CALPHAD thermodynamic modeling and kinetic simulations for sustainable alloy design.',
    tags: ['CALPHAD', 'Machine Learning', 'Alloy Design'],
  },
  {
    id: 'battery-ml-2025',
    title:
      'Atomistic simulation and machine-learning-accelerated screening of coating materials for Li-ion battery cathodes',
    authors: 'S. Rangaswamy et al.',
    venue: 'Manuscript in preparation',
    year: 2025,
    status: 'in-preparation',
    abstract:
      "Master's thesis research at Volkswagen AG: DFT simulation of atomic layer deposition (ALD) cathode coatings and machine-learning techniques to accelerate the discovery of battery materials with improved energy efficiency and stability.",
    tags: ['DFT', 'Batteries', 'Machine Learning'],
  },
];
