import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { getMemoizedNumItems } from "../../../store/cart/cartSlice";
import "../../../i18n";
import { useTranslation } from "react-i18next";
import { logout } from "../../../store/auth/authSlice";
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
                <img src="/images/ecom.png" alt={t("E-commerce")} />
              </div>
            </li>
            <div className={styles.shoppingIcon}>
              <li>
                <NavLink to="/main/cart">
                  <div className="ms-1 me-1">
                    <div>
                      {numberdata ? (
                        <>
                          {" "}
                          <FontAwesomeIcon
                            className="pe-3"
                            icon={faCartShopping}
                            style={{ color: "#707070", marginLeft: "0.3em" }}
                          />
                          <div className={styles.cartButtonIconLTR}>
                            <div>{numberdata}</div>
                          </div>
                        </>
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={faCartShopping}
                            style={{ color: "#707070" }}
                          />

                          <span className="m-1">{t("Cart")}</span>
                        </>
                      )}
                    </div>
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
              <NavLink to="/main/cart">
                <div className="ms-1">
                  {numberdata ? (
                    <div className={styles.cartButtonIconRTL}>
                      <div>{numberdata}</div>
                    </div>
                  ) : (
                    <span className="m-1">{t("Cart")}</span>
                  )}
                  <FontAwesomeIcon
                  className="ms-2"
                    icon={faCartShopping}
                    style={{ color: "#707070" }}
                  />
                </div>
              </NavLink>
            </li>
            <div className={styles.shoppingIcon}>
              <li>
                <div className={styles.logo} style={{margin:"0px"}} onClick={() => navigate("/")}>
                  <img src="/images/ecomArabic.jpeg" alt={t("E-commerce")} />
                </div>
              </li>
            </div>
          </ul>
        </div>
      )}
      <Navbar collapseOnSelect expand="lg" className=" bg-dark  d-flex justify-content-end d-lg-block" id="Navbar">
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="bg-dark border-0 m-1"
        >
          {" "}
          <FontAwesomeIcon icon={faBars} style={{ color: "#ffffff" }} />
        </Navbar.Toggle>
        <Navbar.Collapse
          className="justify-content-between "
          id="responsive-navbar-nav"
        >
          <Nav
            id="mainNav"
            className="mb-1 mb-lg-0"
          >
            <NavItem className="ms-lg-1 me-lg-1  pb-lg-0">
              <NavLink
                end
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {t("Home")}
              </NavLink>
            </NavItem>
            <NavItem className="pt-1 pt-lg-0">
              <NavLink
                to="/main/category"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "active" : ""
                }
              >
                {t("Categories")}
              </NavLink>
            </NavItem>
          </Nav>

          <Nav className="d-lg-flex align-items-lg-center">
            {currentUser.email.length > 0 ? (
              <NavDropdown
                title={
                  <span className="text-white text-left">
                    {t("welcome")} {currentUser.username}
                  </span>
                }
                id="navbarScrollingDropdown"
              >
                {dir === "ltr" ? (
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/main/profile");
                    }}
                    style={{
                      textAlign: "left",
                    }}
                    className={styles.color}
                  >
                    {t("profile")}
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/main/profile");
                    }}
                    style={{
                      textAlign: "right",
                    }}
                    className={styles.color}
                  >
                    {t("profile")}
                  </NavDropdown.Item>
                )}
                {dir === "ltr" ? (
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/main/profile/ordershistory");
                    }}
                    style={{
                      textAlign: "left",
                    }}
                    className={styles.color}
                  >
                    {t("orders")}
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item
                    onClick={() => {
                      navigate("/main/profile/ordershistory");
                    }}
                    style={{
                      textAlign: "right",
                    }}
                    className={styles.color}
                  >
                    {t("orders")}
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item
                  className={styles.button}
                  onClick={handleLogout}
                >
                  {t("logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Nav>
                <NavItem className="d-flex align-items-center">
                  <NavLink
                    className={({ isActive, isPending }) =>
                      isPending ? "pending" : isActive ? "active" : ""
                    }
                    to="/main/login"
                  >
                    {t("Login")}
                  </NavLink>
                </NavItem>
              </Nav>
            )}

            <NavItem className="me-1 ms-1">
              <span>
                {i18n.language === "en" && (
                  <input
                    className="p-0"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      margin: "0.3em 0",
                    }}
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
              <span>
                {i18n.language === "ar" && (
                  <input
                    className="p-0 m-lg-1"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "white",
                      margin: "0.3em 0",
                    }}
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
