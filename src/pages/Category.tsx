import  { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../Hooks/hooks";


import { GridList } from "../components/Layout";

import Card from "../components/Ecom/CardCategory/CardCategory";
import { category } from "../store/category/types";
import { fetchCategories } from "../store/category/thunk/getCategory";



const Category = () => {
  const dispatch = useAppDispatch();

  const { categories,loading,error } = useAppSelector((state) => state.category);

  useEffect(() => {

    dispatch(fetchCategories());
  }, [dispatch]);
  const categoriesData=Object.values(categories);


  return (
  <div className="d-flex">
    <GridList data={categoriesData} loading={loading} error={error} renderChild={(records:category)=>(<Card key={records.id} {...records}/>)}/>
    </div>

  );
};

export default Category;
