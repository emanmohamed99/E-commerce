import { Outlet } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "../../components/Layout/Header/Header";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "../../i18n"

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
