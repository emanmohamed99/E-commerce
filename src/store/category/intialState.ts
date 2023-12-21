import { Tcategory } from "./types";

 interface ProductsState {
    categories:Tcategory[];
    loading:boolean,
error:null|string,
  }
  
export  const initialStateCategory: ProductsState = {
    categories: [],
    loading:false,
    error:null,
    
  };