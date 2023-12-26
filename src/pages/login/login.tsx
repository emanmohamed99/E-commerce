import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import styles from "./login.module.css";

import { login } from "../../store/auth/authSlice";
import { useAppDispatch } from "../../Hooks/hooks";
import { loginuser } from "../../store/auth/thunk/getAuth";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [Error, setError] = useState("");
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
          dispatch(login(res.user));
          navigate("/main");
        })
        .catch(() => {
          setError(t("Email or password isn't exist"));
        });
    },
  });
  return (
    <div className={styles.formWrapper}>
      <Form onSubmit={formik.handleSubmit} className={styles.form}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <h3>{t("log in")}</h3>
          <Form.Label>{t("Email")}</Form.Label>
          <Form.Control
            type="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>{t("Password")}</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={formik.handleChange}
            value={formik.values.password}
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
            {t("log in")}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default Login;
