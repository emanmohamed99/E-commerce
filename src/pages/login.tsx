import {   useState } from "react";

import { Form, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../Hooks/hooks";

import { Button, FormGroup, Input, Label } from "reactstrap";
import styles from "../components/Ecom/spinner/Spinner.module.css"
import { loginuser } from "../store/auth/thunk/getAuth";
import "../i18n";
import { useTranslation } from "react-i18next";
import { login } from "../store/auth/authSlice";


const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  

  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({ email: "", password: "" });
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserData((oldData) => ({ ...oldData, [name]: value }));
  };
 
  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(loginuser({ email: userData.email, password: userData.password }))
      .unwrap()
      .then((res) => {
console.log(res.user)
dispatch(login(res.user))
navigate("/")
     
      })
      .catch(() => {
        setError(t("Email or password not exist"));
      });
    setUserData({ email: "", password: "" });
  };

  return (
    <div> <h3>{t("log in")}</h3>
    <div className={styles.formWrapper}>
     
      <div className={styles.form}>
      
    <Form onSubmit={handleSubmit}>
    <FormGroup floating>
      <Input
        id="exampleEmail"
        name="email"
        placeholder="Email"
        type="email"
        value={userData.email}
        onChange={handleChange}
      />
      <Label for="exampleEmail">
       { t("email")}
      </Label>
    </FormGroup>
 
    <FormGroup floating>
      <Input
        id="examplePassword"
        name="password"
        placeholder="Password"
        type="password"
        value={userData.password}
        onChange={handleChange}
      />
      <Label for="examplePassword">
       {t("password")} 
      </Label>
    </FormGroup>
    <p>  {error}  </p>
    <Button>
  {  t("log in") }
    </Button>
  </Form>
  </div>
  </div>
  
  </div> 

  );
};

export default Login;
