import {  NavLink, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { getMemoizedNumItems } from "../../../store/cart/cartSlice";
import "../../../i18n";
import { useTranslation } from "react-i18next";
import { logout } from "../../../store/auth/authSlice";

import { Fragment, useState } from "react";

import {
  Nav,
  NavItem,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu,
  NavLink as NavLinkBootstrap,
} from "reactstrap";

function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);
  const numberdata = useAppSelector(getMemoizedNumItems);
  const { currentUser2 } = useAppSelector((state) => state.auth);
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
              <img src="images/ecom.jpg" alt={t("E commerce")} />
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
      <Nav className="bg-dark d-flex justify-content-between ">
        <div className="d-flex justify-content-end">
          <NavItem className="d-flex align-items-center m-1">
        
              <NavLink className="active text-decoration-none m-1" to="/main">
                {t("Home")}
              </NavLink>
            
          </NavItem>
          <NavItem  className="d-flex align-items-center m-1">
           
              <NavLink
                className="text-decoration-none color m-1"
                to="/main/category"
              >
                {t("Categories")}
              </NavLink>
           
          </NavItem>
        </div>
        <div className="d-flex justify-content-end ">
          {currentUser2.email.length > 0 ? (
            <Dropdown nav isOpen={dropdownOpen} toggle={toggle} >
              <DropdownToggle nav caret className="text-light">
                {t("welcome")} {currentUser2.username}
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem  className={styles.button}
                    onClick={() => navigate("/main/profile")}>
                 
                
                  
                    {t("profile")}
            
                </DropdownItem>
                <DropdownItem   className={styles.button}
                    onClick={() => navigate("/main/profile/ordershistory")}>
             
                  
                
                    {t("orders")}
            
                </DropdownItem>
                <DropdownItem className={styles.button} onClick={handleLogout}>
              
                    {t("logout")}
                
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Fragment>
              <NavItem  className="d-flex align-items-center m-1">
             
                  <NavLink className="text-decoration-none" to="/main/login">
                    {" "}
                    {t("Log in")}
                  </NavLink>
                
              </NavItem>
              <NavItem  className="d-flex align-items-center m-1">
              
                  <NavLink className="text-decoration-none" to="/main/register">
                    {" "}
                    {t("Sign Up")}
                  </NavLink>
              
              </NavItem>
            </Fragment>
          )}
          <NavItem>
            <NavLinkBootstrap>
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
            </NavLinkBootstrap>
          </NavItem>
          <NavItem>
            <NavLinkBootstrap>
              <span >
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
            </NavLinkBootstrap>
          </NavItem>
        </div>
      </Nav>
    </div>
  );
}

export default Header;
