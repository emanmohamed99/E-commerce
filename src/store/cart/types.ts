import { Tproduct } from "../product/types";


export type CheckoutState = "LOADING" | "READY" | "ERROR";
export type order={
    quantity: number;
    product: Tproduct|undefined; 
}
export type Torders= {
   orders:order[],
      userId:number ,
  id?:number
}