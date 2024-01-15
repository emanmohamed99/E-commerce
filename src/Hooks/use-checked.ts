import { Addorders, checkoutCart } from "../store/cart/thunk/getCart";
import { useAppDispatch, useAppSelector } from "./hooks";
import useItemDetails from "./use-item-details";
import { Tproduct } from "../store/product/types";
import { useNavigate } from "react-router-dom";

const useCheckout = () => {
  const navigate=useNavigate()
  const dispatch = useAppDispatch();

  const checkoutState = useAppSelector((state) => state.cart.checkoutState);

  const { items } = useAppSelector((state) => state.cart);
  const id = Object.keys(items);
  const { productsData } = useItemDetails({ id, items });
  const handleCheckout = (userId: number) => {
    const orders: { product: Tproduct | undefined; quantity: number }[] = [];

    dispatch(checkoutCart());
    if (checkoutState == "READY" && Object.keys(items).length > 0) {
      for (const productId in items) {
        const quantity = items[productId].quantity;
        const product = productsData?.find(
          (product) => product.id === Number(productId)
        );
        const order = { product: product, quantity: quantity };
        orders.push(order);
      }

      dispatch(Addorders({ orders: orders, userId: userId }));
    }
    navigate("/main/CheckoutSucess")
  };
  return handleCheckout;
};
export default useCheckout;
