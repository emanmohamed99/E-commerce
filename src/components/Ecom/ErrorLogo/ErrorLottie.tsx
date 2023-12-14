
import styles from "../spinner/Spinner.module.css";
import errorIcon from "../../../assets/errorIcon/erroricon.json";
import Lottie from 'lottie-react';
const ErrorLottie = () => {
  return (
    <div>
      <div className={styles.WrapperIcon}>
   
   <Lottie  animationData={errorIcon}/>
   </div>
    </div>
  );
}

export default ErrorLottie;
