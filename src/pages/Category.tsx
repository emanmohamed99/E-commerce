import  { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../Hooks/hooks";


import { GridList } from "../components/Layout";


import {  Tcategory} from "../store/category/types";
import { fetchCategories } from "../store/category/thunk/getCategory";
import { CardCategory } from "../components/Ecom";




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
