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

function Header() {
  const numberdata = useAppSelector(getMemoizedNumItems);
  const { currentUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.nav2}>
        <ul>
          <li>
            <div className={styles.logo}>
              <img src="images/ecom.png" alt={t("E-commerce")} />
            </div>
          </li>
          <div className={styles.shoppingIcon}>
            <li>
              <NavLink to="/main/shoppingCard">
                🛒&nbsp;&nbsp;{numberdata ? numberdata : t("Cart")}
              </NavLink>
            </li>
          </div>
        </ul>
      </div>
      <Navbar collapseOnSelect expand="lg" className=" bg-dark" dir="">
        <Navbar.Brand> </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          className="bg-light m-1"
        />
        <Navbar.Collapse
          className="justify-content-between "
          id="responsive-navbar-nav"
        >
          <Nav>
            <Link
              className="active text-decoration-none m-1 text-white"
              to="/main"
            >
              {t("Home")}
            </Link>
            <Link
              className="text-decoration-none color m-1 text-white"
              to="/main/category"
            >
              {t("Categories")}
            </Link>
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
                <NavDropdown.Item onClick={() => navigate("/main/profile")}>
                  {" "}
                  {t("profile")}
                </NavDropdown.Item>
                <NavDropdown.Item
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

            <NavItem>
              <span>
                {" "}
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
            <NavItem>
              <span>
                {" "}
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
