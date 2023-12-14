import {  useState } from "react";

import { Form, useNavigate } from "react-router-dom";

import { useAppDispatch } from "../Hooks/hooks";

import { Button, FormGroup, Input, Label } from "reactstrap";
import styles from "../components/Ecom/spinner/Spinner.module.css"
import { loginuser } from "../store/auth/thunk/getAuth";
const Login = () => {
  const navigate = useNavigate();

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
      .then(() => {
      navigate("/")
      })
      .catch(() => {
        setError(`Email or password not exist `);
      });
    setUserData({ email: "", password: "" });
  };

  return (
    <div> <h3>Login</h3>
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
        Email
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
        Password
      </Label>
    </FormGroup>
    <p>  {error}  </p>
    <Button>
      Submit
    </Button>
  </Form>
  </div>
  </div>
  </div> 

  );
};

export default Login;
