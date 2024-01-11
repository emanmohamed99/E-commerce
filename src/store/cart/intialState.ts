import { Torder } from "../auth/types";
import { Tcategory } from "../category/types";
import { Tproduct } from '../product/types';
import { CheckoutState, Torders } from './types';


export interface CartState {
  items: { [id: string]: {
    quantity:number,
  
  } };
  
 
  checkoutState: CheckoutState;
  errorMessage: string;
  loading: boolean;
  error: null | string ;

  productsData: Tproduct[]|Tproduct[]
  orderData:Torder[],
  userorder:Torders[]
  ischeckedout:boolean
}
export const initialStateCart: CartState = {

  items: {},
  checkoutState: "READY",
  errorMessage: "",
  loading: false,
  error: null,

  productsData: [],
  orderData:[],
  userorder:[],
  ischeckedout:false
}
interface ProductsState {
  categories:  Tcategory[];
  
}

export const initialState: ProductsState = {
  categories: [],
};
