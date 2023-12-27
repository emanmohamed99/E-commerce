import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "./hooks";
import { fetchProductbyid } from "../store/cart/thunk/getCart";
type useItemDetailsProps = {
  id: string | undefined | string[];
  items?: {
    [id: string]: {
      quantity: number;
    };
  };
};

const useItemDetails = ({ id, items }: useItemDetailsProps) => {
  const dispatch = useAppDispatch();
  const { loading, error, productsData } = useAppSelector(
    (state) => state.cart
  );
  useEffect(() => {
    if (id && items) {
      dispatch(fetchProductbyid(id));
    } else if (id) {
      dispatch(fetchProductbyid(id));
    }
  }, [dispatch]);

  return { loading, error, productsData };
};

export default useItemDetails;
