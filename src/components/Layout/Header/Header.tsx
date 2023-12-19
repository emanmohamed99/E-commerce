import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useAppDispatch, useAppSelector } from "../../../Hooks/hooks";
import { getMemoizedNumItems } from "../../../store/cart/cartSlice";
import "../../../i18n";
import { useTranslation } from "react-i18next";
import { logout } from "../../../store/auth/authSlice";


const Header = () => {
 const numberdata  =useAppSelector(getMemoizedNumItems) ;
 const { isLoggedIn } = useAppSelector((state) => state.auth);
 const dispatch = useAppDispatch();

 const handleLogout = () => {
   dispatch(logout());
 };
 const { t, i18n } = useTranslation();

  return (
    <div>
      <div>
        <div className={styles.nav2}>
          <ul>
       <li><div className={styles.logo}><img src="images/ecom.jpg" alt={t("E commerce")} /></div></li>
       <div className={styles.shoppingIcon}>
       <li>
        <NavLink to="/main/profile">
          {t("Acccount")}
          </NavLink>
        </li>
        <li >
          <NavLink to="/main/shoppingCard">
            🛒&nbsp;&nbsp;{numberdata ? numberdata : t("Cart")}
          </NavLink>
        </li>
        
        </div>
     
          </ul></div>
      </div>
      <div className={styles.nav}>
      <ul>
        <li>
          <NavLink className="active" to="/main">
            {t("Home")}
          </NavLink>
        </li>
        <li>
          <NavLink to="/main/category">{t("categories")}</NavLink>
        </li>
        <div className={styles.directionChange}>
        <li>
        { i18n.language==="en"&&<input type="button" value="AR" onClick={()=>{i18n.changeLanguage("ar")} } />}
        { i18n.language==="ar"&&<input type="button" value="EN" onClick={()=>{i18n.changeLanguage("en")}}/>}

          </li>
       
        {isLoggedIn ? <button onClick={handleLogout}>Logout</button>:<li><li><NavLink to="/main/login"> {t("log in")}</NavLink></li>
        <li>
          <NavLink to="/main/register"> {t("sign up")}</NavLink>
        </li>
        </li>

        }
        </div>
      </ul>
    </div>
    </div>
  );
};

export default Header;
