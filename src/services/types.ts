export interface Book {
    id:number;
    title: string;
    quantity: number;
    category_id: number;
    category?:Category;
  }

export interface Category {
    id: number;
    name: string;
    deletedAt?: string | null;
}
  
  