import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { getMemoizedNumItems } from "../../../store/cart/cartSlice";
import "../../../i18n";
import { useTranslation } from "react-i18next";
import { logout } from "../../../store/auth/authSlice";
import { Fragment } from "react";
import { NavItem } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faCartShopping } from "@fortawesome/free-solid-svg-icons";
function Header() {
  const numberdata = useAppSelector(getMemoizedNumItems);
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const { t, i18n } = useTranslation();
  const dir = i18n.dir(i18n.language);
  const navigate = useNavigate();
  return (
    <div>
      {dir === "ltr" ? (
        <div className={styles.nav}>
          <ul>
            <li>
              <div className={styles.logo} onClick={() => navigate("/")}>
                <img src="images/ecom.png" alt={t("E-commerce")} />
              </div>
            </li>
            <div className={styles.shoppingIcon}>
              <li>
                <NavLink to="/main/shoppingCard">
                  <div>
                    <FontAwesomeIcon
                      icon={faCartShopping}
                      style={{ color: "#707070" }}
                    />
                    {numberdata ? (
                      <div className={styles.cartButtonIconLTR}>
                        <div>{numberdata}</div>
                      </div>
                    ) : (
                      <span className="m-1">{t("Cart")}</span>
                    )}
                  </div>
                </NavLink>
              </li>
            </div>
          </ul>
        </div>
      ) : (
        <div className={styles.nav}>
          <ul>
            <li>
              <NavLink to="/main/shoppingCard">
                <div>
                  {numberdata ? (
                    <div className={styles.cartButtonIconRTL}>
                      <div>{numberdata}</div>
                    </div>
                  ) : (
                    <span className="m-1">{t("Cart")}</span>
                  )}
                  <FontAwesomeIcon
                    icon={faCartShopping}
                    style={{ color: "#707070" }}
                  />
                </div>
              </NavLink>
            </li>
            <div className={styles.shoppingIcon}>
              <li>
                <div className={styles.logo} onClick={() => navigate("/")}>
                  <img src="images/ecomArabic.jpeg" alt={t("E-commerce")} />
                </div>
              </li>
            </div>
          </ul>
        </div>
      )}
      <Navbar collapseOnSelect expand="lg" className=" bg-dark">
        <Navbar.Brand> </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="bg-dark border-0 m-1"
        >
          {" "}
          <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} />{" "}
        </Navbar.Toggle>
        <Navbar.Collapse
          className="justify-content-between "
          id="responsive-navbar-nav"
        >
          <Nav id="mainNav">
            <NavItem className="pb-2 pb-lg-0">
              <NavLink end
                to="/main"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {t("Home")}
              </NavLink>
            </NavItem>

            <NavLink
              to="/main/category"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "active" : ""
              }
            >
              {t("Categories")}
            </NavLink>
          </Nav>

          <Nav>
            {currentUser.email.length > 0 ? (
              <NavDropdown
                title={
                  <span className="text-white m-1">
                    {t("welcome")} {currentUser.username}
                  </span>
                }
                id="navbarScrollingDropdown"
              >
                <NavDropdown.Item
                  onClick={() => navigate("/main/profile")}
                  className={styles.color}
                >
                  {" "}
                  {t("profile")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={styles.color}
                  onClick={() => navigate("/main/profile/ordershistory")}
                >
                  {t("orders")}
                </NavDropdown.Item>
                <NavDropdown.Item
                  className={styles.button}
                  onClick={handleLogout}
                >
                  {t("logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Fragment>
                <NavItem className="d-flex align-items-center m-1">
                  <Link className="text-decoration-none" to="/main/login">
                    {" "}
                    {t("Log in")}
                  </Link>
                </NavItem>
                <NavItem className="d-flex align-items-center m-1">
                  <Link className="text-decoration-none" to="/main/register">
                    {" "}
                    {t("Sign Up")}
                  </Link>
                </NavItem>
              </Fragment>
            )}

            <NavItem className="me-1 ms-1">
              <span >
               
                {i18n.language === "en" && (
                  <input
                    className={styles.buttonColor}
                    type="button"
                    value="العربية"
                    onClick={() => {
                      i18n.changeLanguage("ar");
                    }}
                  />
                )}
              </span>
            </NavItem>
            <NavItem className="me-1 ms-1">
              <span >
              
                {i18n.language === "ar" && (
                  <input
                    className={styles.buttonColor}
                    type="button"
                    value="English"
                    onClick={() => {
                      i18n.changeLanguage("en");
                    }}
                  />
                )}
              </span>
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default Header;
