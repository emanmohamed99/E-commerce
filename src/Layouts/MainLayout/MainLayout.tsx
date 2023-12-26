import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n"
import "./MainLayout.css"
import { Header } from "../../components/Layout";
const RootLayout = () => {
  const { i18n} = useTranslation();
  useEffect(() => {

    const dir = i18n.dir(i18n.language);
    document.documentElement.dir = dir;
 }, [i18n, i18n.language]);
  return (
    <>
      <Header />
      <Outlet />
    
    </>
  );
};

export default RootLayout;
