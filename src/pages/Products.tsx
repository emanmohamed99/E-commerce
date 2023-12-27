import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";

import { Tproduct } from "../store/product/types";

import { useParams } from "react-router-dom";

import { GridList } from "../components/Layout";
import { fetchproduct } from "../store/product/thunk/getProduct";
import { CardProduct } from "../components/Ecom";

const Products = () => {
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );
  const items = useAppSelector((state) => state.cart.items);

  const { name } = useParams();

  const dispatch = useAppDispatch();
 
  useEffect(() => {
    if (name) {
      dispatch(fetchproduct(name));
    } 
  }, [dispatch, name]);

  return (
    <GridList
      data={products}
      loading={loading}
      error={error}
      renderChild={(records) => (
        <CardProduct
          key={records.id}
          {...(records as Tproduct)}
          items={items}
        />
      )}
    />
  );
};

export default Products;
