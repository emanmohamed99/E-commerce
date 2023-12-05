import { category } from "./types";

 interface ProductsState {
    categories:category[];
    loading:boolean,
error:null|string,
  }
  
export  const initialStateCategory: ProductsState = {
    categories: [],
    loading:false,
    error:null,
  };