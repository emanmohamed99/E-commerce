import { Outlet, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { useTranslation } from "react-i18next";
const Profile = () => {
  const { t } = useTranslation();
  const navigate=useNavigate()
  return (
   
    <div className={styles.container}>
    <div className={styles.sidebar}>
      {/* Sidebar content goes here */}
     <div className={styles.sidebarbuttons}>
      <button onClick={()=> navigate("/main/profile/information")}>{t("personal information")}</button>
          <button onClick={()=> navigate("/main/profile/edit")}>{t("update information")}</button>
          <button onClick={()=> navigate("/main/profile/orderhistory")}>{t("orders")}</button>
        {/* Add more items as needed */}
        </div>
    </div>
    <div className={styles.maincontent}>
     <Outlet/>
    </div>
  </div>
   
  );
};

export default Profile;
