import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import styles from "./Register.module.css";
import { postSchema } from "../../utils/validationSchema";

import { login } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../Hooks/hooks";
import { registerUser } from "../../store/auth/thunk/getAuth";
import { useTranslation } from "react-i18next";
import { useState } from "react";


const Register = () => {

  const [Error, setError] = useState("");
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(i18n.language);

  const formik = useFormik({
    initialValues: {
      email: "",
      username: "",
      password: "",
    },
  
    validationSchema: postSchema,
    onSubmit: (values) => {
      dispatch(
        registerUser({
          email: values.email,
          password: values.password,
          username: values.username,
        })
      )
        .unwrap()
        .then((res) => {
          dispatch(login(res.user));
         
          navigate("/");
        })
        .catch(() => {
          setError("user already exist please go to log in page")
        });
    },
  });
  return (
   
      <div className={styles.formWrapper}>
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
          <h3> {t("sign up")}</h3>
          <Form.Group className="mb-3" id="exampleForm.ControlTextarea1">
            <Form.Label htmlFor="usernameResister">{t("Username")}</Form.Label>
            <Form.Control
           
        style={ dir==="ltr"?{backgroundPosition: "right calc(.375em + .1875rem) center"}:{backgroundPosition:  "left calc(.375em + .1875rem) center"}}
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={!!formik.errors.username}
              id="usernameResister"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="exampleForm.ControlInput1">
            <Form.Label  htmlFor="emailResister"> {t("Email")}</Form.Label>
            <Form.Control
              style={ dir==="ltr"?{backgroundPosition:  "right calc(.375em + .1875rem) center"}:{backgroundPosition:  "left calc(.375em + .1875rem) center"}}
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              isInvalid={!!formik.errors.email}
              id="emailResister"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" id="exampleForm.ControlTextarea2">
            <Form.Label  htmlFor="passwordResister">{t("Password")}</Form.Label>
            <Form.Control
              style={ dir==="ltr"?{backgroundPosition:  "right calc(.375em + .1875rem) center"}:{backgroundPosition:  "left calc(.375em + .1875rem) center"}}
              type="password"
              name="password"
              id="passwordResister"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={!!formik.errors.password}
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
              {t("sign up")}
            </Button>
          </div>
        </Form>
      </div>
 
  );
};

export default Register;
