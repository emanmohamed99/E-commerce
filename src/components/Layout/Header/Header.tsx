import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { useAppSelector } from "../../../Hooks/hooks";
import { getMemoizedNumItems } from "../../../store/cart/cartSlice";
const Header = () => {
 const numberdata  =useAppSelector(getMemoizedNumItems) ;
  return (
    <div>
      <div>
        <div className={styles.nav2}>
          <ul>
       <li><div className={styles.logo}><img src="images/ecom.jpg" alt="e commerce" /></div></li>
       <div className={styles.shoppingIcon}>
        <li >
          <NavLink to="/main/shoppingCard">
            🛒&nbsp;&nbsp;{numberdata ? numberdata : "Cart"}
          </NavLink>
        </li></div>
          </ul></div>
      </div>
      <div className={styles.nav}>
      <ul>
        <li>
          <NavLink className="active" to="/main">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/main/category">category</NavLink>
        </li>
        <div className={styles.directionChange}>
        <li>
          <NavLink to="/main/login">login</NavLink>
        </li>
        <li>
          <NavLink to="/main/register">register</NavLink>
        </li>
        </div>
      </ul>
    </div>
    </div>
  );
};

export default Header;
