import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";

import { getOrder } from "../../store/cart/thunk/getCart";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Ecom/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

const OrdersHistory = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const { userorder, loading, error } = useAppSelector((state) => state.cart);

  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser.id !== 0) {
      dispatch(getOrder(currentUser.id));
    }
  }, [dispatch, currentUser]);
  const { t, i18n } = useTranslation();
  const dir = i18n.dir(i18n.language);
  return (
    <div>
      <Loading loading={loading} error={error}>
        <div>
          {userorder.map((dataItem, index) =>
            dataItem.orders.map((order, orderIndex) => (
              <Card key={orderIndex + 1} body className="m-1">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="m-1 d-flex align-items-center col-6">
                      <div className="d-flex m-2 col-3">
                        <img
                          src={order.product?.img}
                          alt={order.product?.title}
                        />
                      </div>
                      <div className="col-9">
                        <div>{order.product?.title}</div>
                        <div>
                          {t("quantity")}: {order.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                    <Button className="d-flex justify-content-center align-content-center bg-transparent border-0"
                  
                
                      onClick={() => {
                        navigate(
                          `/main/profile/OrderHistory/${order.product?.id}`
                        );
                      }}
                    >
                      {dir == "ltr" ? (
                        <FontAwesomeIcon icon={faAngleRight}  style={{color:"gray"}} />
                      ) : (
                        <FontAwesomeIcon icon={faAngleLeft} style={{color:"gray"}}/>
                      )}
                    </Button>
                    </div>
                  </div>

                  <div className="d-flex justify-content-end">
                    {t("orderID")} #{index + 1}
                  </div>
                </CardBody>
              </Card>
            ))
          )}
        </div>
      </Loading>
    </div>
  );
};

export default OrdersHistory;
