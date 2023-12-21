import  { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../Hooks/hooks";


import { GridList } from "../components/Layout";

import CardCategory from "../components/Ecom/CardCategory/CardCategory";
import {  Tcategory} from "../store/category/types";
import { fetchCategories } from "../store/category/thunk/getCategory";




const Category = () => {
  const dispatch = useAppDispatch();

  const { categories,loading,error } = useAppSelector((state) => state.category);

  useEffect(() => {

    dispatch(fetchCategories());
  }, [dispatch]);
  const categoriesData=Object.values(categories);


  return (
 
    <GridList data={categoriesData} loading={loading} error={error} renderChild={(records)=>(<CardCategory  key={records.id}{...(records as Tcategory)}/>)}/>
  

  );
};

export default Category;
