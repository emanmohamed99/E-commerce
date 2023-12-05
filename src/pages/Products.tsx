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
// const item=product;
// console.log(item,"item");
  // const [filteredData, setFiltered] = useState(products);
  const dispatch = useAppDispatch();
 
  // useEffect(() => {
    // if (name) {
    
    //   setFiltered(product);
    // } else if (Object.values(products).length > 0 && !name) {
    //   setFiltered(Object.values(products));
    // }
    
  
  // }, [name,product,products,dispatch]);

  useEffect(() => {
  
    if(name){
      dispatch(fetchproduct(name));//prefix
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
