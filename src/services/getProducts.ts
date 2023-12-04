import axios from "axios";

const products =axios.get("http://localhost:7400/items")

const getProductsAPI = () => Promise.resolve(products);
const getProductAPI = (cat_prefix:string|undefined) => Promise.resolve(axios.get(`http://localhost:7400/items?cat_prefix=${cat_prefix}`));
export {getProductsAPI,getProductAPI} ;