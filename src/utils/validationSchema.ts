
import * as Yup from "yup";
import i18next from "i18next";



const usernamematches = i18next.t('Username cannot start with a number');
const usernamemin = i18next.t('Username must be at least 3 characters');
const passwordmin = i18next.t('Password must be at least 6 characters');
const passwordmatches = i18next.t('Password must contain at least one character');
const Required=i18next.t("Required");

export const postSchema = Yup.object().shape({
  username: Yup.string().required(Required)
  .matches(/^(?![0-9])/, usernamematches)
  .min(3, usernamemin),
  email: Yup.string().required(Required),
  password: Yup.string()
  .min(6, passwordmin)
  .matches(/^.*[^\s].*$/, passwordmatches)
  .required(Required),

});
