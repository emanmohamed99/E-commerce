import { category } from "../category/types";
import { product } from '../product/types';
import { CheckoutState } from './types';


export interface CartState {
  items: { [id: string]: {
product:product
    quantity:number,
  
  } };
  
 
  checkoutState: CheckoutState;
  errorMessage: string;
  loading: boolean;
  error: null | string ;

  productsData: product[]

}
export const initialStateCart: CartState = {

  items: {},
  checkoutState: "READY",
  errorMessage: "",
  loading: false,
  error: null,

  productsData: [],

}
interface ProductsState {
  categories:  category[];
  
}

export const initialState: ProductsState = {
  categories: [],
};
