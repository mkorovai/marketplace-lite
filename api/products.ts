import { apiGet } from './client';

export type ProductsResponse = {
  products: any[];
};

export function getProducts() {
  return apiGet<ProductsResponse>('/products');
}
