import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";
import {  useEffect } from 'react';
import { getOrder } from "../../store/cart/thunk/getCart";



const OrderHistory = () => {
    const dispatch=useAppDispatch()
    const currentUser = useAppSelector((state) => state.auth.currentUser2);
    const userorder = useAppSelector((state) => state.cart.userorder);
  
    useEffect(() => {
        if(currentUser.id!=0){
            dispatch(getOrder(currentUser.id))
        }
       
    }, [dispatch,currentUser]);
    console.log(userorder);
  return (
    <div>
        <table className="table" cellPadding="2px">
  <thead>
    <tr>
    <th scope="col">numbers</th>
      <th scope="col">quantity</th>
      <th scope="col">title</th>
      <th scope="col">gender</th>
      <th scope="col">max quanity</th>
      <th scope="col">price</th>
    
    </tr>
  </thead>
  <tbody>
    {userorder.map((dataItem, index) => (
        <tr key={index}>
            {index+1}
          {dataItem.orders.map((order, orderIndex) => (
           <tr key={orderIndex}>
                
            <td>{order.quantity}</td> 
            <td> {order.product?.title}</td>
            <td> {order.product?.cat_prefix}</td>
            <td> {order.product?.max_quantity}</td>
            <td> {order.product?.price}</td>
            
            </tr>
            
          ))}
        </tr>
      ))}
        </tbody>
</table>
      </div>
      
      
  );
}

export default OrderHistory;
