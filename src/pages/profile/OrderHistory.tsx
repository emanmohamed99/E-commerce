import  { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/hooks';

import { getOrder } from '../../store/cart/thunk/getCart';
import { useTranslation } from 'react-i18next';

const OrderHistory = () => {
    const dispatch = useAppDispatch();
    const currentUser = useAppSelector((state) => state.auth.currentUser2);
    const userorder = useAppSelector((state) => state.cart.userorder);
    const { t } = useTranslation();
    useEffect(() => {
        if (currentUser.id !== 0) {
            dispatch(getOrder(currentUser.id));
        }
    }, [dispatch, currentUser]);

    return (
        <div>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">{t("number of orders")}</th>
                        <th scope="col">{t("quantity")}</th>
                        <th scope="col">{t("title")}</th>
                        <th scope="col">{t("category")}</th>
                        <th scope="col">{t("max quantity")}</th>
                        <th scope="col">{t("price")}</th>
                    </tr>
                </thead>
                <tbody>
                    {userorder.map((dataItem, index) => (
                        dataItem.orders.map((order, orderIndex) => (
                            <tr key={`${index}-${orderIndex}`}>
                                {orderIndex === 0 && (
                                    <td rowSpan={dataItem.orders.length}>{index + 1}</td>
                                )}
                                <td>{order.quantity}</td>
                                <td>{order.product?.title}</td>
                                <td>{order.product?.cat_prefix}</td>
                                <td>{order.product?.max_quantity}</td>
                                <td>{order.product?.price}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderHistory;
