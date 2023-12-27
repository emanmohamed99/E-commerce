import axios from "axios";
import { Torders } from "../store/cart/types";

export type CartItems = { [productID: string]: {

  quantity: number;
} };
export type CheckoutResponse = { success: boolean; error?: string };

const addOrderAPI = (userorder:Torders) => Promise.resolve(axios.post(`http://localhost:7400/orders`, userorder));
const getOrderAPI = (User_id:number) => Promise.resolve(axios.get(`http://localhost:7400/orders/?userId=${User_id}`));

const checkout= async function checkout(items: CartItems): Promise<CheckoutResponse> {

  const modifier = Object.keys(items).length > 0 ? "success" : "error";
  const url = `/checkout-${modifier}.json`;

  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(items),
  });
  const data = await response.json();
  if (!data.success) {
    throw new Error(data.error);
  }
  return data as CheckoutResponse;
}


export {addOrderAPI,getOrderAPI,checkout} ;