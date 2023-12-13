import { Tauth, Tuser } from "./types";

interface AuthState {
    user: Tauth,
    token:string,
    loading:boolean,
    error:null|string,
    currentUser:Tuser
  }
 
export const initialStateAuth:AuthState = {
   
    user: {
        email: "",
        id: 0
    },
    token: "",
    loading:false,
    error:null,
    currentUser:{
      email: "",
      password: "",
      id:0
    }
    
  };