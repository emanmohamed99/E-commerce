import { useAppDispatch, useAppSelector } from '../../../Hooks/hooks';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import styles from "./Cart.module.css";
import {
  removeFromCart,
  updateQuantity,
} from "../../../store/cart/cartSlice";

import {   Addorders, checkoutCart, fetchProductbyids } from "../../../store/cart/thunk/getCart";
import {  useEffect } from 'react';

import { Tproduct } from '../../../store/product/types';
import { useTranslation } from 'react-i18next';
import { Button, Table } from 'reactstrap';


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
  const currentUser = useAppSelector((state) => state.auth.currentUser2);
 

  const orders: { product: Tproduct | undefined; quantity: number; }[]=[];

  
  
  const { t} = useTranslation();

  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(checkoutCart());
 
  
    if(checkoutState=='READY'&&Object.keys(items).length>0){
      for (const productId in items) {
        const quantity = items[productId].quantity;
        const product = productsData?.find(product => product.id === Number(productId));
        const order={product:product,quantity:quantity}
        orders.push(order)
      } 
   
        dispatch(Addorders({orders:orders,userId:currentUser.id}))
   
    }
    
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
    if(items){
      dispatch(fetchProductbyids(Object.keys(items)))
    }
   
  }, [dispatch, items]);
  return (
    <div>
      <main className="page">
        <Table className={tableClasses}>
          <thead>
            <tr>
            <th scope="col"> { t("product")}</th>
            <th></th>
              <th >{ t("quantity")}</th>
              <th >{ t("total")}</th>
              <th >{ t("remove")}</th>
            </tr>
          </thead>
          <tbody>
            {productsData.length!=0?productsData.map((product) => (
              <tr key={product.id}>
            <th scope="row"><div className={styles.imageWrapper}> <img src={product.img} alt={product.title}/></div> </th>     
                <td>{product.title}</td>
                <td>
                  <select
                    name="numbers"
                    className={styles.input}
                    defaultValue={items[product.id]?.quantity}
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
            )):<tr>   <td></td>
            <td></td><td>{ t("there is no items")}</td>
            <td></td>
              <td></td></tr>
            // :<tr ><td><div className={styles.centerDiv} >there is no items avalible</div></td></tr>
            }
          </tbody>
          <tfoot>
            <tr>
              <td>{ t("total")}</td>
              <td></td>
              <td></td>
              <td className={styles.total}>${totalPrice}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table>
        <form onSubmit={onCheckout} className={styles.form}>
          {checkoutState === "ERROR" && errorMessage ? (
            <p className={styles.errorBox}>{errorMessage}</p>
          ) : null}
          <Button className={styles.button} type="submit">
          { t("checkout")}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default Cart;
