import  { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchProductbyids } from "../store/cart/thunk/getCart";
type useItemDetailsProps={
  id:string|undefined|string[],
  items?:{ [id: string]: {

    quantity:number,
  
  } }
}
const useItemDetails = ({id,items}:useItemDetailsProps) => {
  const dispatch = useAppDispatch();
  const { loading, error, productsData } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if(id&&items){
    dispatch(fetchProductbyids(id));}
  }, [dispatch,items]);

  return { loading, error, productsData };
};

export default useItemDetails;
