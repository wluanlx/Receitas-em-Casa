export type Difficulty = 'Fácil' | 'Médio' | 'Difícil';

export interface Recipe {
  id: string;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  difficulty: Difficulty;
  category: string;
  servings: string;
  image: string;
}

export interface SearchHistory {
  id: string;
  ingredients: string[];
  timestamp: number;
}
