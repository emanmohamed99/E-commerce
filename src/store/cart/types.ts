import { product } from "../product/types";


export type CheckoutState = "LOADING" | "READY" | "ERROR";
export type order={
    quantity: number;
    product: product|undefined; 
}
export type Torders= {
   orders:order[],
      userId:number ,
  id?:number
}