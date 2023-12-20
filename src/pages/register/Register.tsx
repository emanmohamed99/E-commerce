import { Button, Form } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { useFormik } from "formik";
import styles from "./Register.module.css";
import { postSchema } from "../../utils/validationSchema";
import Loading from "../../components/Ecom/Loading/Loading";
import { login } from "../../store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import { registerUser } from "../../store/auth/thunk/getAuth";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { loading, error } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
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
        .catch(() => {});
    },
  });
  return (
    <Loading loading={loading} error={error}>
      <div className={styles.formWrapper}>
        <Form onSubmit={formik.handleSubmit} className={styles.form}>
          <h3> {t("sign up")}</h3>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label> {t("email")}</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              isInvalid={!!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{t("Username")}</Form.Label>
            <Form.Control
              name="username"
              onChange={formik.handleChange}
              value={formik.values.username}
              isInvalid={!!formik.errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>{t("password")}</Form.Label>
            <Form.Control
              type="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
              isInvalid={!!formik.errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <div className={styles.button}>
            <Button variant="primary" type="submit">
              {t("sign up")}
            </Button>
          </div>
        </Form>
      </div>
    </Loading>
  );
};

export default Register;
