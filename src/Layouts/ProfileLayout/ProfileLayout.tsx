import { Outlet, useNavigate } from "react-router-dom";
import styles from "./profile.module.css";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faUserPen,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="m-2" >
      <div className="container-fluid ">
        <div className="row flex-nowrap">
      
          <div
            className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark bg-opacity-75 rounded collapse show mt-3"
            id="sidebar"
            style={{ height: "250px" }}
          >
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white ">
          <div className="mt-3 d-sm-block d-none">{t("Menu")}</div>

              <ul
                className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start p-0 "
                id="menu"
              >
                <li>
                  <div
                    data-bs-toggle="collapse"
                    className="nav-link px-0 align-middle"
                  >
                    <i className="fs-4 bi-speedometer2"></i>{" "}
                  </div>
                  <ul
                    className="collapse show nav flex-column ms-1 m-0 p-0"
                    id="submenu1"
                    data-bs-parent="menu"
                    style={{ width: "max-content" }}
                  >
                    <li className="w-100">
                      <div className="nav-link px-0 ">
                        {" "}
                        <button
                          className={styles.button}
                          onClick={() => navigate("/main/profile/information")}
                        >
                      <span className="me-1">  <FontAwesomeIcon
                            icon={faUser}
                            style={{ color: "#ffffff" }}
                          /></span>  
                        </button>
                        <span className="d-none d-sm-inline">
                          {" "}
                          <button
                            className={styles.button}
                            onClick={() =>
                              navigate("/main/profile/information")
                            }
                          >
                            {t("personal info")}
                          </button>
                        </span>{" "}
                      </div>
                    </li>
                    <li className="w-100">
                      <div className="nav-link px-0">
                        {" "}
                        <button
                          className={styles.button}
                          onClick={() => navigate("/main/profile/edit")}
                        >
                      <FontAwesomeIcon
                            icon={faUserPen}
                            style={{ color: "#ffffff" }}
                          />{" "}
                        </button>
                        <span className="d-none d-sm-inline">
                          <button
                            className={styles.button}
                            onClick={() => navigate("/main/profile/edit")}
                          >
                            {t("update info")}
                          </button>
                        </span>
                      </div>
                    </li>
                    <li className="w-100">
                      <div className="nav-link px-0">
                        {" "}
                        <button
                          className={styles.button}
                          onClick={() =>
                            navigate("/main/profile/ordershistory")
                          }
                        >
                        <span className=" me-1"><FontAwesomeIcon
                            icon={faCalendarDays}
                            style={{ color: "#ffffff" }}
                          />{" "}</span>  
                        </button>
                        <span className="d-none d-sm-inline ms-1 me-1">
                          <button
                            className={styles.button}
                            onClick={() =>
                              navigate("/main/profile/ordershistory")
                            }
                          >
                            {t("orders")}
                          </button>
                        </span>{" "}
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
              <hr />
            </div>
          </div>
          <div className="col py-3">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
