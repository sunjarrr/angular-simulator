export interface IRecipe {
  id: number;
  name: string;
  ingredients: string;
  instructions: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: string;
  tags: string;
  userId: number
  image: string;
  rating: number;
  reviewCount: string;
  mealType: string;
}