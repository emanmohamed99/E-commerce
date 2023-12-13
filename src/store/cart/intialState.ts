import { category } from "../category/types";
import { CheckoutState } from './types';
import { product } from '../product/types';

export interface CartState {
  items: { [id: string]: {
    product:product,
    quantity:number,
    productbtid:[]|undefined
  } };
  
 
  checkoutState: CheckoutState;
  errorMessage: string;
  loading: boolean;
  error: null | string ;
  isabled: boolean;

}
export const initialStateCart: CartState = {

  items: {},
  checkoutState: "READY",
  errorMessage: "",
  loading: false,
  error: null,
  isabled:false,

}
interface ProductsState {
  categories:  category[];
  
}

export const initialState: ProductsState = {
  categories: [],
};
