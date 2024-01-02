import ErrorLottie from "./ErrorLogo/ErrorLottie";
import SpinnerComponent from "./spinner/Spinner";

type LoadingProps = {
  loading: boolean | undefined;
  error: string | null | undefined;
  children: React.JSX.Element;
};
const Loading = ({ loading, error, children }: LoadingProps) => {
  const renderHandler = () => {
    return (
      <>{loading ? <SpinnerComponent /> : error ? <ErrorLottie /> : children}</>
    );
  };

  return renderHandler();
};

export default Loading;
