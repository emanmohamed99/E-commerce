import { useAppSelector } from "../Hooks/hooks";

import Cart from "../components/Ecom/Cart/Cart";
// import Loading from "../components/Ecom/Loading/Loading";

import { getTotalPrice } from "../store/cart/cartSlice";

const ShoppingCard = () => {

  const {items} = useAppSelector((state) => state.cart);

  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
  // const { loading, error } = useAppSelector((state) => state.cart);
  const errorMessage = useAppSelector((state) => state.cart.errorMessage);

// console.log(loading,"loading");
  return (
    <div>
     
    
        <Cart
          items={items}
          totalPrice={totalPrice}
          checkoutState={checkoutState}
          errorMessage={errorMessage}
        />
     
    </div>
  );
};

export default ShoppingCard;
