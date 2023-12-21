import { useAppSelector } from "../../Hooks/hooks";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Layouts/ProfileLayout/profile.module.css"
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ProfileInfo = () => {
  

  const currentUser = useAppSelector((state) => state.auth.currentUser2);
  const { t } = useTranslation();
  
  return (
    <div>
      <h3>{t("profile")}</h3>
     
        <Card
          style={{
            margin: "2rem",
          }}
        >
          <button className={styles.cartinfo}>
            <Link to="/main/profile/edit">
          
              <FontAwesomeIcon icon={faPenToSquare} style={{color:"black"}} size="lg" />
            </Link>
          </button>

          <CardBody>
            <CardTitle tag="h5">{t("Username")}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              <div>{currentUser.username}</div>
            </CardSubtitle>
            <CardTitle tag="h5">{t("Email")}</CardTitle>
            <CardSubtitle className="mb-2 text-muted" tag="h6">
              <div>{currentUser.email}</div>
            </CardSubtitle>
          </CardBody>
        </Card>
   
    </div>
  );
};

export default ProfileInfo;
