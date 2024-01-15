import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import styles from "./login.module.css";

import { login } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import { loginuser } from "../../store/auth/thunk/getAuth";
import { useTranslation } from "react-i18next";
import { useState } from "react";

import useCheckout from "../../Hooks/use-checked";




const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [Error, setError] = useState("");
  const {ischeckedout,items} = useAppSelector((state) => state.cart);
  const handleCheckout = useCheckout();
  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    onSubmit: (values) => {
      dispatch(loginuser({ email: values.email, password: values.password }))
        .unwrap()
        .then((res) => {
          if(Object.keys(items).length>0&&ischeckedout){
                     const UserId=res.user.id 
            
                     handleCheckout(UserId);
                     dispatch(login(res.user))
                   
            
                    
                   }
          else{dispatch(login(res.user));
        navigate("/");}
        })
        .catch(() => {
          setError(t("Email or password isn't exist"));
        });
    },
  });
  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <Form.Group className="mb-3" id="exampleForm.ControlInput1">
          <h3>{t("Login")}</h3>
          <Form.Label htmlFor="emailLogin">{t("Email")}</Form.Label>
      
          <Form.Control
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            id="emailLogin"
            required
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" id="exampleForm.ControlTextarea">
          <Form.Label htmlFor="passwordLogin">{t("Password")}</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
            id="passwordLogin"
            required
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
       { Error?<div className="alert alert-danger" role="alert">
          {Error}
        </div>:""}

        <div className={styles.button}>
          <Button variant="primary" type="submit">
            {t("Login")}
            
          </Button>
    
        </div>
   <div className="text-center m-2">
         <div className="m-1">{t("new to ecommerce?")} </div>  
         <Button variant="secondary" type="submit" onClick={()=>{navigate("/main/register")}}>{t("register now")}</Button></div>
      </Form>
    </div>
  );
};

export default Login;
