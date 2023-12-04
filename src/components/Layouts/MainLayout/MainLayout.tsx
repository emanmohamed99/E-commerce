import { Outlet } from "react-router-dom";

import Header from "../../Layout/Header/Header";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
