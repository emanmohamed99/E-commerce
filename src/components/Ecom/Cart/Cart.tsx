import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import styles from "./Cart.module.css";
import {
  removeFromCart,
  updateQuantity,
} from "../../../store/cart/cartSlice";

import { checkoutCart, fetchProductbyids } from "../../../store/cart/thunk/getCart";
import { useEffect } from 'react';
import { product } from '../../../store/product/types';

type CartType = {
  items: { [id: string]: {
    quantity:number,
product:product
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
                    onChange={(e) => onQuantityChanged(e, product.id,product.max_quantity)}
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
            )):"no items"
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
