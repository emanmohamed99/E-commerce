import * as Yup from "yup";

export const postSchema = Yup.object().shape({
  username: Yup.string().required("Required")
  .matches(/^[^0-9][\w\d]*$/, 'Username cannot start with a number')
  .min(3, 'Username must be at least 3 characters'),
  email: Yup.string().required("Required"),
  password: Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .matches(/^.*[^\s].*$/, 'Password must contain at least one character')
  .required('Password is required'),

  
});
