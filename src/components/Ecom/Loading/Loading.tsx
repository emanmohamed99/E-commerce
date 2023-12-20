
import ErrorLottie from "../ErrorLogo/ErrorLottie";
import SpinnerComponent from "../spinner/Spinner";
type Loadingtypes = {
  loading: boolean|undefined;
  error: string | null|undefined;
  children: JSX.Element;
};
const Loading = ({ loading, error, children }: Loadingtypes) => {


  const renderHandler = () => {
   
    return (
      <>{loading ? <SpinnerComponent /> : error ? <ErrorLottie/> : children}</>
    );
  };

  return renderHandler();
};

export default Loading;
