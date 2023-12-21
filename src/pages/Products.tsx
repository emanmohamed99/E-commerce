import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";

import {  Tproduct } from '../store/product/types';
import CardProduct from "../components/Ecom/CardProduct/CardProduct";
import { useParams } from "react-router-dom";


import { GridList } from "../components/Layout";
import { fetchProducts ,fetchproduct} from "../store/product/thunk/getProduct";








const Products = () => {
  const { products, loading, error} = useAppSelector(
    (state) => state.products
  );
  const items = useAppSelector(
    (state) => state.cart.items
  );



  const { name } = useParams();

  const dispatch = useAppDispatch();
 




  useEffect(() => {
  
    if(name){
      dispatch(fetchproduct(name));
    }else{
      dispatch(fetchProducts()
      
      );
     
    }
   
  }, [dispatch,name]);
 
 
  return (
   

      <GridList
      
        data={products}
        loading={loading}
        error={error}
        renderChild={(records)=>(
        
        
           <CardProduct  key={records.id}{...(records as Tproduct) } items={items}/>   

        )}
      />
 

  );
};

export default Products;
