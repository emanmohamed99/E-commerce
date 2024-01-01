import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";

import { getOrder } from "../../store/cart/thunk/getCart";
import { useTranslation } from "react-i18next";
import { Button, Card, CardBody } from "reactstrap";
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import styles from "../../Layouts/ProfileLayout/profile.module.css";
import { Loading } from "../../components/Ecom";

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
    <div >
      <Loading loading={loading} error={error}>
        <div>
        <h3 className="d-flex justify-content-center mb-2">{t("Orders")}</h3>
          {userorder.length!=0?userorder.map((dataItem, index) =>
            dataItem.orders.map((order, orderIndex) => (
              <Card key={orderIndex + 1} body className="m-1">
                <CardBody>
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="m-1 d-flex align-items-center col-6">
                      <div className="d-flex m-2 col-3">
                        <div className="position-relative">
                          <img
                            src={order.product?.img}
                            alt={order.product?.title}
                          />

                          {dir === "ltr" ? (
                            <div className={styles.orderNumberLTR}>
                              <div>x{order.quantity}</div>
                            </div>
                          ) : (
                            <div className={styles.orderNumberRTL}>
                              <div>x{order.quantity}</div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col-9">
                        <div>{order.product?.title}</div>
                      </div>
                    </div>
                    <div className="col-6 d-flex justify-content-end">
                      <Button
                        className="d-flex justify-content-center align-content-center border-0"
                        style={{ backgroundColor: "transparent" }}
                        onClick={() => {
                          navigate(
                            `/main/profile/ordershistory/${order.product?.id}`
                          );
                        }}
                      >
                        {dir == "ltr" ? (
                          <FontAwesomeIcon
                            icon={faAngleRight}
                            style={{ color: "gray" }}
                          />
                        ) : (
                          <FontAwesomeIcon
                            icon={faAngleLeft}
                            style={{ color: "gray" }}
                          />
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
          ):t("There is no Orders")}
        </div>
      </Loading>
    </div>
  );
};

export default OrdersHistory;
