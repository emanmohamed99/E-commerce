import React, { useState } from "react";
import { UpdateUser } from "../../store/auth/thunk/getAuth";
import { Form, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import { Button, FormGroup, Input, Label } from "reactstrap";
import { useTranslation } from "react-i18next";
const ProfileEdit = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.currentUser);

  const { t } = useTranslation();

  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    email: currentUser.email,
    username: currentUser.username,
    id: "",
  });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setUserData((oldData) => ({ ...oldData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      UpdateUser({
        username: userData.username,
        email: userData.email,
        id: currentUser.id,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/main/profile");
      })
      .catch(() => {});
    setUserData({ email: "", username: "", id: "" });
  };
  return (
    <div style={{height:"100vh"}}>
       <h3 className="d-flex justify-content-center">{t("Update Information")}</h3>
      <Form onSubmit={handleSubmit}>
        <Label for="exampleUsername">{t("Username")} </Label>
        <FormGroup floating>
          <Label></Label>
          <Input
            id="exampleUsername"
            name="username"
            type="text"
            value={userData.username}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <Label for="exampleEmail">{t("Email")}</Label>
        <FormGroup floating>
          <Input
            id="exampleEmail"
            name="email"
            type="email"
            value={userData.email}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button variant="primary" type="submit">
          {t("update")}
        </Button>
      </Form>
    </div>
  );
};

export default ProfileEdit;
