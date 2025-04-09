// types/product.ts
export interface Product {
    _id: string; 
    name: string;
    price: number;
    stock: number;
    images?: string[];
    category?: string;
    sellerId?: string;
 
  }