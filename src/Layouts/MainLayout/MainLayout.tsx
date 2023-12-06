import { Outlet } from "react-router-dom";

import Header from "../../components/Layout/Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
