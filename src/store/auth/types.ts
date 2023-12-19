import { product } from "../product/types";

export type Tauth = {
   email:string,
   username:string
  id:number
  };
  export type Tresgister = {
   email:string,
  password:string,
  username:string
  };
  export type Tlogin = {
   email:string,
  password:string
  };
  export type TuserUpdate = {
   email:string,
  username:string,
  id:number
  };
  export type Tuser = {
   email:string,
  username:string,

  };
  export type Torder={
   productsData:product[]|null,
   items:{ [id: string]: {
      quantity:number,
    } ,

   }
   currentUser:TuserUpdate|null
  }
 
