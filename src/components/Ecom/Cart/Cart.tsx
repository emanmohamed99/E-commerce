import { useAppDispatch } from "../../../Hooks/hooks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import styles from "./Cart.module.css";

import {

  removeFromCart,
  updateQuantity,
} from "../../../store/cart/cartSlice";
import { product } from '../../../store/product/types';
import { checkoutCart } from "../../../store/cart/thunk/getCart";

type CartType = {

  items: { [id: string]: {
    product:product,
    quantity:number,
    productbtid:[]|undefined
  } };
  totalPrice: string;
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

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart());
  }
  function onQuantityChanged(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) {
    const quantity = Number(e.target.value) || 0;
    const max_quantityProduct = items[id].product.max_quantity;
  if(quantity>3){
    alert(`sorry but maximum quentity is ${max_quantityProduct} `)
  }
    dispatch(updateQuantity({ id, quantity, max_quantityProduct }));
  }


  const tableClasses = classNames({
    [styles.table]: true,
    [styles.checkoutError]: checkoutState === "ERROR",
    [styles.checkoutLoading]: checkoutState === "LOADING",
  });
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
            {totalPrice!="0.00"?Object.values(items).map(({product,quantity}) => (
              <tr key={product.id}>
            <td><div className={styles.imageWrapper}> <img src={product.img} alt={product.title}/></div> </td>  
             
                <td>{product.title}</td>
                <td>
                  <select
                    name="numbers"
                    className={styles.input}
                    defaultValue={quantity}
                    onChange={(e) => onQuantityChanged(e, product.id)}
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
            )):<tr ><td><div className={styles.centerDiv} >there is no items avalible</div></td></tr>}
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
