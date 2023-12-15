import { product } from "../product/types";


export type CheckoutState = "LOADING" | "READY" | "ERROR";
export type Torders= {
    orders: {
        quantity: number;
        product: product;
    }[];
}