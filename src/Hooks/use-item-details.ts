import  { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchProductbyids } from "../store/cart/thunk/getCart";
type useItemDetailsProps={
  id:string|undefined
}
const useItemDetails = ({id}:useItemDetailsProps) => {
  const dispatch = useAppDispatch();
  const { loading, error, productsData } = useAppSelector((state) => state.cart);

  useEffect(() => {
    if(id){
    dispatch(fetchProductbyids(id));}
  }, [dispatch,id]);

  return { loading, error, productsData };
};

export default useItemDetails;
