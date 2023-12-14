import { product } from "./types";

export interface ProductsState {
  products: product[];
  loading: boolean;
  error: null | string;
}

export const initialStateProduct: ProductsState = {
  products: [],
  loading: false,
  error: null,
};
