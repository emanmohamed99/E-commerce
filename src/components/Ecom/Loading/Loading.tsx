import React from "react";
import SpinnerComponent from "../spinner/Spinner";
type Loadingtypes = {
  loading: boolean;
  error: string | null;
  children: JSX.Element;
};
const Loading = ({ loading, error, children }: Loadingtypes) => {
  const elementType = children?.type?.render?.displayName;

  const renderHandler = () => {
    if (elementType === "Button") {
      const cloneButton = React.cloneElement(
        children,
        { disabled: true },
        "Loading..."
      );
      return (
        <>
          {loading ? (
            cloneButton
          ) : error ? (
            <>
              {children}
              <p>
                <br />
                {error}
              </p>
            </>
          ) : (
            children
          )}
        </>
      );
    }
    return (
      <>{loading ? <SpinnerComponent /> : error ? <p>{error}</p> : children}</>
    );
  };

  return renderHandler();
};

export default Loading;
