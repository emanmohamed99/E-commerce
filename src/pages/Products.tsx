import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";

import { product as Tproduct } from '../store/product/types';
import CardProduct from "../components/Ecom/CardProduct/CardProduct";
import { useParams } from "react-router-dom";

import style from "../components/Ecom/CardProduct/CardProduct.module.css";
import { GridList } from "../components/Layout";
import { fetchProducts ,fetchproduct} from "../store/product/thunk/getProduct";

import { SwiperSlide } from 'swiper/react';



import 'swiper/css';
import { getUser } from "../store/auth/thunk/getAuth";


const Products = () => {
  const { products, loading, error} = useAppSelector(
    (state) => state.products
  );
  const items = useAppSelector(
    (state) => state.cart.items
  );



  const { name } = useParams();

  const dispatch = useAppDispatch();
  const token = localStorage.getItem('token');

//  console.log(token);

  useEffect(() => {
  
    if(name){
      dispatch(fetchproduct(name));
    }else{
      dispatch(fetchProducts()
      
      );
     
    }
   
  }, [dispatch,name]);
  useEffect(() => {
  if(token){
    dispatch(getUser())
  }
    
   
  }, [dispatch,token]);
 
  return (
    <div className={style.cardParent}>

      <GridList
      
        data={products}
        loading={loading}
        error={error}
        renderChild={(records: Tproduct) => (
          
          <SwiperSlide key={records.id}><CardProduct  {...records} items={items}/></SwiperSlide>
        )}
      />
      
    </div>
  );
};

export default Products;
