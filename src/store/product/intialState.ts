import { Tproduct } from "./types";

export interface ProductsState {
  products: Tproduct[];
  loading: boolean;
  error: null | string;
}

export const initialStateProduct: ProductsState = {
  products: [],
  loading: false,
  error: null,
};
