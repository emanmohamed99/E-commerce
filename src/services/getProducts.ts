import axios from "axios";

const products =axios.get("http://localhost:7400/items")

const getProductsAPI = () => Promise.resolve(products);

const getProductAPI = (cat_prefix:string|undefined) => Promise.resolve(axios.get(`http://localhost:7400/items?cat_prefix=${cat_prefix}`));

const getProductAPIbyid = (id: string[] |string) => {
   
    
   

    
  const idParams = Array.isArray(id) ? id.join('&id=') : id;
    

  
 
    return axios.get(`http://localhost:7400/items?id=${idParams}`)
    
  };
export {getProductsAPI,getProductAPI,getProductAPIbyid} ;