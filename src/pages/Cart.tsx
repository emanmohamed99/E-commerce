import { useAppSelector } from "../Hooks/hooks";
import { Loading } from "../components/Ecom";

import Cart from "../components/Ecom/Cart/Cart";


import { getTotalPrice } from "../store/cart/cartSlice";

const ShoppingCard = () => {

  const {items,loading,error} = useAppSelector((state) => state.cart);

  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
 
  const errorMessage = useAppSelector((state) => state.cart.errorMessage);


  return (
    
    <Loading loading={loading} error={error}>
        <Cart
          items={items}
          totalPrice={totalPrice}
          checkoutState={checkoutState}
          errorMessage={errorMessage}
        />
    </Loading>

  );
};

export default ShoppingCard;
