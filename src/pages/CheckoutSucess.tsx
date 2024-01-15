import { useTranslation } from "react-i18next";


const CheckoutSucess = () => {
    const { t } = useTranslation();
  return (
    <div className="w-100 d-flex justify-content-center my-3 text-center"><div><div  className=" bg-black d-flex justify-content-center mt-3" style={{height:"300px"}}><img src="/images/orderSucess.png" alt={("cart") }className="bg-white" /></div><h5 className="mt-3">{t("Your order placed sucessfully")} </h5></div></div>
  );
}

export default CheckoutSucess;
