// API client
import { apiGet } from './client';

// types
import { Product as ProductResponse } from '@/types/product';

export type ProductsResponse = {
  products: ProductResponse[];
};

// Fetch all products
export function getProducts() {
  return apiGet<ProductsResponse>('/products');
}

// Fetch single product by id
export function getProduct(id: string | number) {
  return apiGet<ProductResponse>(`/products/${id}`);
}
