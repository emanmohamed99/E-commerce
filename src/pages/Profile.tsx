import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";
import { UpdateUser, getUser } from "../store/auth/thunk/getAuth";
import { useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import styles from "../components/Ecom/spinner/Spinner.module.css"
const Profile = () => {
  const token = localStorage.getItem('token');
  const dispatch = useAppDispatch();
  
  const currentUser = useAppSelector(
    (state) => state.auth.currentUser
  );
  console.log(currentUser);
  useEffect(() => {
    if(token){
      dispatch(getUser())
      
    }
    }, [dispatch,token]);
    const navigate = useNavigate();
    const [error, setError] = useState("");
  
    
  
    const [userData, setUserData] = useState({ email: "",username:"",id:"" });
    const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => {
      const { value, name } = e.target;
      setUserData((oldData) => ({ ...oldData, [name]: value }));
    };
  
    const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if(token){
        dispatch(UpdateUser({username:userData.username,email:userData.email,id:currentUser.id}))
        .unwrap()
        .then(() => {
          navigate("/main/profile");
        })
        .catch(() => {
          setError("Email Already Exist");
        });
      setUserData({ email: "" ,username:"",id:""})}}
  return (
    <div>
       <div>
      {currentUser?
      <div>
          <div>{currentUser.username}</div>
        <div>{currentUser.email}</div>
      
      </div>
      :"there is no user"}
    </div>
    <div>
       

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
        required
      />
      <Label for="exampleUsername">
      Username
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
        required
      />
      <Label for="exampleEmail">
        Email
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
    </div>
   
  );
}

export default Profile;
