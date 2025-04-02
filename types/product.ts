// types/product.ts
export interface Product {
    _id: string; // Required (not optional)
    name: string;
    price: number;
    stock: number;
    images?: string[];
    category?: string;
    sellerId?: string;
    // Add other fields as needed
  }