import { category } from "../category/types";
import { CheckoutState } from "./types";

export interface CartState {
  items: { [id: string]: number };
  checkoutState: CheckoutState;
  errorMessage: string;
  loading: boolean;
  error: null | string ;
}
export const initialStateCart: CartState = {
  items: {},
  checkoutState: "READY",
  errorMessage: "",
  loading: false,
  error: null,
};
interface ProductsState {
  categories: { [id: string]: category };
}

export const initialState: ProductsState = {
  categories: {},
};
