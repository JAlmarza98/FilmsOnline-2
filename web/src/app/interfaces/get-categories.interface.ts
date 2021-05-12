import { category } from '../models/categories.models';

export interface getCategories {
  categories: category[]
  total_categories: number
}
