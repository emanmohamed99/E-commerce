import { product } from "../product/types";

export type CheckoutState = "LOADING" | "READY" | "ERROR";
export type Torder ={
    product:product,
    quantity:number,
}