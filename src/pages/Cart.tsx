import { useAppSelector } from "../Hooks/hooks";


import Cart from "../components/Ecom/Cart/Cart";


import { getTotalPrice } from "../store/cart/cartSlice";

const ShoppingCard = () => {

  const {items} = useAppSelector((state) => state.cart);

  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
 
  const errorMessage = useAppSelector((state) => state.cart.errorMessage);


  return (
    
    
        <Cart
          items={items}
          totalPrice={totalPrice}
          checkoutState={checkoutState}
          errorMessage={errorMessage}
        />
  

  );
};

export default ShoppingCard;
