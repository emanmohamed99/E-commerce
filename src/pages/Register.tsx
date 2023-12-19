import React, { useState } from "react";

import { useNavigate } from "react-router-dom";


import { useAppDispatch } from "../Hooks/hooks";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../components/Ecom/spinner/Spinner.module.css"
import { registerUser } from "../store/auth/thunk/getAuth";
import { useTranslation } from "react-i18next";
import { login } from "../store/auth/authSlice";
const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [userData, setUserData] = useState({ email: "", password: "",username:"" });
  const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
    const { value, name } = e.target;
    setUserData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    dispatch(registerUser({ email: userData.email, password: userData.password ,username:userData.username}))
      .unwrap()
      .then((res) => {
        dispatch(login(res.user))
        navigate("/")
      })
      .catch(() => {
        setError(t("Email Already Exist"));
      });
    setUserData({ email: "", password: "" ,username:""});
  };

  return (
    <div>
        <h3>  { t("sign up")}</h3>

    <div className={styles.formWrapper}>
      
      <div className={styles.form}>
    <Form onSubmit={handleSubmit}>
    <FormGroup floating>
      <Input
        id="exampleUsername"
        name="username"
        placeholder="Username"
        type="text"
        value={userData.username}
        onChange={handleChange}
      />
      <Label for="exampleUsername">
     { t("Username")}
      </Label>
    </FormGroup>
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
      { t("password")}
      </Label>
    </FormGroup>
   
    <p>  {error}  </p>
    <Button>
    { t("sign up")}
    </Button>
  </Form>
  </div>
  </div>
  </div>
  );
};

export default Register;
