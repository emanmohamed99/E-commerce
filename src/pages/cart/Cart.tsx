
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import styles from "./Cart.module.css";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { Button, Table } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";


import { checkedout, getTotalPrice, removeFromCart, updateQuantity } from "../../store/cart/cartSlice";


import useItemDetails from "../../Hooks/use-item-details";
import { Loading } from "../../components/Ecom";





import useCheckout from "../../Hooks/use-checked";



const Cart = () => {
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const {items} = useAppSelector((state) => state.cart);

  const totalPrice = useAppSelector(getTotalPrice);
  const checkoutState = useAppSelector((state) => state.cart.checkoutState);
 




  const handleCheckout = useCheckout();
  const { t } = useTranslation();
  const navigate = useNavigate();
  function onCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const UserId=currentUser.id
        handleCheckout(UserId)
  }

 function showAlert(text:string,title:string ) {
    Swal.fire({
      title: title,
      text: text,
      icon: "error",

      confirmButtonText: "OK",
      confirmButtonColor:"#007bffbb"
    });
  }
  function onQuantityChanged(
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number,
    max_quantity: number
  ) {
    const quantity = Number(e.target.value) || 0;
    if (quantity > 3) {
      e.target.value = "3";

      showAlert(
        t("sorry but the avalible quantity is ")+max_quantity,t("error")
       
      );
    }
    dispatch(updateQuantity({ id, quantity, max_quantity }));
  }

  const tableClasses = classNames({
    [styles.table]: true,
    [styles.checkoutError]: checkoutState === "ERROR",
    [styles.checkoutLoading]: checkoutState === "LOADING",
  });
  const id=Object.keys(items);
  const { productsData ,loading,error} = useItemDetails({ id,items });

  return (
  
      <div>
        <Loading loading={loading} error={error}>
        <main className="page" >
        <h3 className="d-flex justify-content-center mt-1">{t("Shopping Cart")}</h3>
        {productsData.length != 0 ?<Table className={tableClasses}>
            <thead>
              <tr>
                <th colSpan={2}> {t("product")}</th>
                <th>{t("quantity")}</th>
                <th>{t("total")}</th>
                <th >{t("remove")}</th>
              </tr>
            </thead>

            <tbody>
              { (
                productsData.map((product) => (
                  <tr key={product.id} className="w-100">
                    <td>
                      <div className={styles.imageWrapper}>
                        {" "}
                        <img src={product.img} alt={product.title} />
                      </div>{" "}
                    </td>
                    <td>{product.title}</td>
                    <td>
                      <select
                        name="numbers"
                        className={styles.input}
                        defaultValue={items[product.id]?.quantity}
                        onChange={(e) => {
                          onQuantityChanged(
                            e,
                            product.id,
                            product.max_quantity
                          );
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
                ))
              ) }
            </tbody>

            <tfoot>
              <tr>
                <td colSpan={3}>{t("total")}</td>
            
                <td colSpan={2}
                className={styles.total}>${totalPrice}</td>

              </tr>
            </tfoot>
          </Table>:(<div className="w-100 d-flex justify-content-center my-3 text-center"><div><div  className=" bg-black d-flex justify-content-center" style={{height:"300px"}}><img src="/images/cart.jpg" alt={("cart")} /></div><h5>{t("Your shopping cart looks empty")} </h5><h6>{t("What are you waiting for?") }</h6></div></div>)}
            <form onSubmit={onCheckout} className={styles.form}>
           
                {currentUser.username&& Object.keys(items).length>0? 
                (<Button className={styles.button} type="submit">
                {t("checkout")}
              </Button>):( Object.keys(items).length>0?(
              <Button
                className={styles.button}
           
                onClick={() => {
                  dispatch(checkedout())
                  navigate("/main/login")
                }}
              >
                {t("checkout")}
              </Button>):(<div className="d-flex justify-content-center w-100 "><Button className={styles.button} onClick={()=>{navigate("/")}}> {t("START SHOPPING")  }  </Button> </div>))}
            </form>
        </main>
        </Loading>
      </div>
  
  );
};

export default Cart;
