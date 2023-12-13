// import Spinner from 'react-bootstrap/Spinner';
import styles from "./Spinner.module.css";
import iconLoading from "../../../assets/LoadingIcon/loadingIcon.json";
import Lottie from "lottie-react"
function SpinnerComponent() {
  return (

    <div className={styles.WrapperIcon}>
   
    <Lottie  animationData={iconLoading}/>
    </div>
  );
}

export default SpinnerComponent;