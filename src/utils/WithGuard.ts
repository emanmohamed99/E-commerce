import { useAppSelector } from "../Hooks/hooks";
import Login from "../pages/login/login";

const withGuard = (Component: () => React.JSX.Element) => {
  const Wrapper = () => {
    const { currentUser } = useAppSelector((state) => state.auth);
    return currentUser.email.length > 0
      ? Component() 
      : Login();
  };
  return Wrapper;
};

export default withGuard;
