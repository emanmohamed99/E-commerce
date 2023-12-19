import axios from "axios";
import { Tlogin, Tresgister, TuserUpdate } from "../store/auth/types";


const postAuthregisterAPI = (registerData: Tresgister) => Promise.resolve(axios.post(`http://localhost:7400/register`, registerData));
const postAuthloginAPI = (loginData: Tlogin) => Promise.resolve(axios.post( "http://localhost:7400/login",   loginData));
const updateAuthUsersAPI = (dataUpdate: TuserUpdate) => Promise.resolve(axios.patch(   `http://localhost:7400/users/${dataUpdate.id}`,   dataUpdate));
export  {postAuthregisterAPI,postAuthloginAPI,updateAuthUsersAPI};