import React, {  useState } from 'react';
import { UpdateUser } from '../../store/auth/thunk/getAuth';
import { Form, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';
import { FormGroup, Input, Label } from 'reactstrap';
import styles from "../../Layouts/ProfileLayout/profile.module.css"
import { useTranslation } from 'react-i18next';
const ProfileEdit = () => {
 
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const currentUser = useAppSelector((state) => state.auth.currentUser2);
  console.log(currentUser.email);
   
    const navigate = useNavigate();
  
 
    const [userData, setUserData] = useState({ email: currentUser.email, username: currentUser.username, id: "" });
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
          .catch(() => {
           
          });
        setUserData({ email: "", username: "", id: "" });
      
    };
  return (
    <div className={styles.profileEditWrapper}>
        
            <Form onSubmit={handleSubmit}>
              <FormGroup floating>
                <Input
                  id="exampleUsername"
                  name="username"
                  placeholder="Username"
                  type="text"
                  value={userData.username}
                  onChange={handleChange}
                  required
                />
                <Label for="exampleUsername">{t("Username")}</Label>
              </FormGroup>
              <FormGroup floating>
                <Input
                  id="exampleEmail"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
                <Label for="exampleEmail">{t("log in")}</Label>
              </FormGroup>

             
            <input type="submit" value={t("update")} />
            </Form>
          </div>
     
  );
}

export default ProfileEdit;
