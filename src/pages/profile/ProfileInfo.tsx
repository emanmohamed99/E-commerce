import { useAppSelector } from "../../Hooks/hooks";
import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Layouts/ProfileLayout/profile.module.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
const ProfileInfo = () => {
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(i18n.language);
  const currentUser = useAppSelector((state) => state.auth.currentUser);

  return (
    <div>
      <h3>{t("Profile")}</h3>
      <Card
        style={{
          margin: "2rem",
        }}
      >
        {dir == "ltr" ? (
          <button className={styles.cartinfo}>
            <Link to="/main/profile/edit">
              <FontAwesomeIcon
                icon={faPenToSquare}
                style={{ color: "blue" }}
                size="lg"
              />
            </Link>
          </button>
        ) : (
          <button className={styles.cartinfo_left}>
            <Link to="/main/profile/edit">
              <FontAwesomeIcon
                icon={faPenToSquare}
                rotation={270}
                style={{ color: "#007aff" }}
                size="lg"
              />
            </Link>
          </button>
        )}

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
