import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";

import { product as p } from '../store/product/types';
import CardProduct from "../components/Ecom/CardProduct/CardProduct";
import { useParams } from "react-router-dom";
// import { useState } from "react";

import style from "../components/Ecom/CardProduct/CardProduct.module.css";
import { GridList } from "../components/Layout";
import { fetchProducts ,fetchproduct} from "../store/product/thunk/getProduct";



const Products = () => {
  const { products, loading, error} = useAppSelector(
    (state) => state.products
  );
 
  const { name } = useParams();

  const dispatch = useAppDispatch();
 

  useEffect(() => {
  
    if(name){
      dispatch(fetchproduct(name));
    }else{
      dispatch(fetchProducts());
    }
   
  }, [dispatch,name]);

  return (
    <div className={style.cardParent}>
      <GridList
        data={products}
        loading={loading}
        error={error}
        renderChild={(records: p) => (
          <CardProduct key={records.id} item={records} />
        )}
      />
    </div>
  );
};

export default Products;
