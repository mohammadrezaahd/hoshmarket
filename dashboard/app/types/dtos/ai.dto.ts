import type { ICategoryAttr } from "../interfaces/attributes.interface";

export interface IAiSuggestion {
  data?: ICategoryAttr[];
  categoryId: number;
  id: string | number;
}
