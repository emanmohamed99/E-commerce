import { useAppDispatch } from "../../../Hooks/hooks";

import classNames from "classnames";

import styles from "./Cart.module.css";

import {

  removeFromCart,
  updateQuantity,
} from "../../../store/cart/cartSlice";
import { product } from "../../../store/product/types";
import { checkoutCart } from "../../../store/cart/thunk/getCart";

type CartType = {
  products: { [id: string]: product };
  items: { [id: string]: number };
  totalPrice: string;
  checkoutState: "LOADING" | "READY" | "ERROR";
  errorMessage: string;
};

const Cart = ({
  items,
  products,
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
    id: string
  ) {
    const quantity = Number(e.target.value) || 0;
    const max_quantityProduct = products[id].max_quantity;
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
        <h1>Shopping Cart</h1>
        <table className={tableClasses}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Total</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(items).map(([id, quantity]) => (
              <tr key={id}>
                <td>{products[id].title}</td>
                <td>
                  <select
                    name="numbers"
                    className={styles.input}
                    defaultValue={quantity}
                    onChange={(e) => onQuantityChanged(e, id)}
                  >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                  </select>
                </td>
                <td>${products[id].price}</td>
                <td>
                  <button
                    onClick={() => dispatch(removeFromCart(id))}
                    aria-label={`Remove ${products[id].title}} from Shopping Cart`}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
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
