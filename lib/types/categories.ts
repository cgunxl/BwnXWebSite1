export interface CategoryData {
  name: string | Record<string, string>;
  description: string;
  icon: string;
  color: string;
  slug?: string;
}

export type Categories = Record<string, CategoryData>;