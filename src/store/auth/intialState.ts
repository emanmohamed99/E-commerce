import { Tauth, Tuser, TuserUpdate } from './types';

interface AuthState {
    user: Tauth,
 
    token:string,
    loading:boolean,
    error:null|string,
  
    UpdateUser:Tuser,
    isLoggedIn:boolean;
    currentUser2:TuserUpdate,
  }
 
export const initialStateAuth:AuthState = {
   
    user: {
      username:"",
        email: "",
        id: 0
    },
  
    token: "",
    loading:false,
    error:null,
    
    currentUser2:{
      email: "",
      username:"",
   id:0
    },
    UpdateUser:{
      email: "",
      username:"",
      
    },
    
    isLoggedIn:false
  };