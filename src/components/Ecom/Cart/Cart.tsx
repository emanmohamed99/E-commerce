import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import styles from "./Cart.module.css";
import {
  removeFromCart,
  updateQuantity,
} from "../../../store/cart/cartSlice";

import {  checkoutCart, fetchProductbyids } from "../../../store/cart/thunk/getCart";
// import { useCallback, useEffect } from 'react';


type CartType = {
  items: { [id: string]: {
    quantity:number,

  } };
  totalPrice: number;
  checkoutState: "LOADING" | "READY" | "ERROR";
  errorMessage: string;
};

const Cart = ({
  items,
  totalPrice,
  checkoutState,
  errorMessage,
}: CartType) => {
  const dispatch = useAppDispatch();
  const productsData = useAppSelector((state) => state.cart.productsData);
  // const currentUser = useAppSelector((state) => state.auth.currentUser);
//  console.log(currentUser.id);
//   console.log(items)
//   console.log(productsData);

  // useEffect( () => {
  
    

  //     // dispatch(Addorders({   productsData,    items,    currentUser}))
  
  //    if (productsData&&items) {
         
    
  //         for (const productId in items) {
       
  //             const quantity = items[productId].quantity;
    
  //             const product = productsData?.find(product => product.id === Number(productId));
    
  //             if (product) {
  //               const order = {
  //                 orders: [
  //                   {
  //                     quantity,
  //                     product
  //                   }
  //                 ],
                
                
  //               };
    
  //               dispatch(Addorders(order))
  //               console.log(order);
  //             }
  //           }
  //         }
        
  
        
      
   
  // }, [dispatch, items, productsData]);
  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart());
  }
  function onQuantityChanged(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number,
    max_quantity:number
  ) {
    const quantity = Number(e.target.value) || 0;
  if(quantity>3){
    alert(`sorry but maximum quentity is ${max_quantity} `)
  }
  //product,quantity
    dispatch(updateQuantity({ id, quantity, max_quantity }));
  }
 

  const tableClasses = classNames({
    [styles.table]: true,
    [styles.checkoutError]: checkoutState === "ERROR",
    [styles.checkoutLoading]: checkoutState === "LOADING",
  });
 
  useEffect(() => {
    dispatch(fetchProductbyids(Object.keys(items)))
  }, [dispatch, items]);
  return (
    <div>
      <main className="page">
        <table className={tableClasses}>
          <thead>
            <tr>
            <th>Product</th>
            <th></th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {productsData.length!=0?productsData.map((product) => (
              <tr key={product.id}>
            <td><div className={styles.imageWrapper}> <img src={product.img} alt={product.title}/></div> </td>     
                <td>{product.title}</td>
                <td>
                  <select
                    name="numbers"
                    className={styles.input}
                    defaultValue={items[product.id].quantity}
                    onChange={(e) =>{onQuantityChanged(e, product.id,product.max_quantity)   
                    }}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </td>
                <td>${product.price}</td>
                <td>
                  <button 
                    onClick={() => dispatch(removeFromCart(product.id))}
                    aria-label={`Remove ${product.title}} from Shopping Cart`}
                    className={styles.cartButton}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            )):<tr><td>no items</td></tr>
            // :<tr ><td><div className={styles.centerDiv} >there is no items avalible</div></td></tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <td>Total</td>
              <td></td>
              <td className={styles.total}>${totalPrice}</td>
              <td></td>
            </tr>
          </tfoot>
        </table>
        <form onSubmit={onCheckout} className={styles.form}>
          {checkoutState === "ERROR" && errorMessage ? (
            <p className={styles.errorBox}>{errorMessage}</p>
          ) : null}
          <button className={styles.button} type="submit">
            Checkout
          </button>
        </form>
      </main>
    </div>
  );
};

export default Cart;
