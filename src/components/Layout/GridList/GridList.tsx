import styles from "./GridList.module.css"
import Loading from '../../Ecom/Loading/Loading';
import { ReactElement } from "react";
import { Swiper } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
type GridListTypes<T>={
  loading:boolean,
  error:null|string,
  renderChild:(record: T )=>ReactElement,
  data:T[];
} 
const GridList  =<T,> ({data,loading,error,renderChild}:GridListTypes<T>) => {
    const {grid}=styles;
    const renderItems=
    
    data.length>0? data.map((record) =>renderChild(record))
    :"there is no record avalible"
  return (
  <Loading loading={loading} error={error}>
    <div className={grid}> 
    <Swiper 
  modules={[Navigation, Pagination, Scrollbar, A11y]}
  spaceBetween={50}
  slidesPerView={5}
  navigation
  pagination={{ clickable: true }}
  // scrollbar={{ draggable: true }}
    >
    {
      renderItems
  }
     </Swiper>
    </div>
    </Loading>
  );
}

export default GridList;
