import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";

import { getOrder } from "../../store/cart/thunk/getCart";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Ecom/Loading/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
const OrdersHistory = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser2);
  const { userorder, loading, error } = useAppSelector((state) => state.cart);
  const { t } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser.id !== 0) {
      dispatch(getOrder(currentUser.id));
    }
  }, [dispatch, currentUser]);

  return (
    <div>
      <Loading loading={loading} error={error}>
        <div>
          {userorder.map((dataItem, index) =>
            dataItem.orders.map((order, orderIndex) => (
              <Card key={orderIndex + 1} body className="m-1">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="m-1 d-flex align-items-center">
                      <div className="d-flex m-1 w-25">
                        <img
                          src={order.product?.img}
                          alt={order.product?.title}
                        />
                      </div>
                      <div>
                        <div>{order.product?.title}</div>
                        <div>
                          {t("quantity")}: {order.quantity}
                        </div>
                      </div>
                    </div>
                    <Button
                      onClick={() => {
                        navigate(
                          `/main/profile/OrderHistory/${order.product?.id}`
                        );
                      }}
                    >
                      <FontAwesomeIcon icon={faAngleRight} />
                    </Button>
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
