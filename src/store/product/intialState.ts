import { product } from "./types";


export interface ProductsState {
    products: { [id: string]: product }
    loading:boolean,
    error:null|string,
    product:product[],
  }
  
 export const initialStateProduct: ProductsState = {
    products: {},
    loading:false,
    error:null,
    product:[]
  };
  