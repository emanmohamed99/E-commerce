import { useEffect } from "react";
import { useAppDispatch } from "../../Hooks/hooks";

import { fetchProductbyids } from "../../store/cart/thunk/getCart";
import { useTranslation } from "react-i18next";
import { Card, CardBody } from "reactstrap";
import { useParams } from "react-router-dom";
import { Loading } from "../../components/Ecom";
import useItemDetails from "../../Hooks/use-item-details";



const OrderHistory = () => {
  const dispatch = useAppDispatch();

 

  const { id } = useParams();
  const {productsData,loading,error}  = useItemDetails({id})
  useEffect(() => {
    if (id) {
      dispatch(fetchProductbyids(id));
    }
  }, [dispatch, id]);
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(i18n.language);
  return (
    <div>
      <Loading loading={loading} error={error}>
        <Card>
          <CardBody>
            <div className="m-1 d-flex align-items-center col-12">
              <div className="d-flex m-1 col-2 ">
                <div className="d-flex m-1">
                  <img
                    src={productsData[0]?.img}
                    alt={productsData[0]?.title}
                  />
                </div>
              </div>
              <div className="col-10">
                <div className="m-1">{productsData[0]?.title}</div>
                {dir == "ltr" ? (
                  <div className="m-1">
                    {t("EGP")} {productsData[0]?.price}
                  </div>
                ) : (
                  <div className="m-1">
                    {productsData[0]?.price} {t("EGP")}
                  </div>
                )}
              </div>
            </div>
          </CardBody>
        </Card>
      </Loading>
    </div>
  );
};

export default OrderHistory;
