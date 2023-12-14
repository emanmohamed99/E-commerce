import axios from "axios";

const register =axios.post(  "http://localhost:7400/register")

const postAuthregisterAPI = () => Promise.resolve(register);

export  {postAuthregisterAPI};