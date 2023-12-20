import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import styles from "./login.module.css";
import Loading from "../../components/Ecom/Loading/Loading";
import { login } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import { loginuser } from "../../store/auth/thunk/getAuth";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { loading, error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

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
          navigate("/");
        })
        .catch(() => {
          // setError(t("Email or password not exist"));
        });
    },
  });
  return (
    <Loading loading={loading} error={error}>
      <div className={styles.formWrapper}>
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <h3>{t("log in")}</h3>
            <Form.Label>{t("email")}</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <div className={styles.button}>
            <Button variant="primary" type="submit">
              {t("log in")}
            </Button>
          </div>
        </Form>
      </div>
    </Loading>
  );
};

export default Login;
