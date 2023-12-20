import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../Hooks/hooks";

import { fetchProductbyids } from "../../store/cart/thunk/getCart";
import { useTranslation } from "react-i18next";
import {  Card, CardBody } from "reactstrap";
import {  useParams } from "react-router-dom";
import Loading from "../../components/Ecom/Loading/Loading";


const OrderHistory = () => {
  const dispatch = useAppDispatch();


  const { productsData, loading, error } = useAppSelector((state) => state.cart);
  const { t } = useTranslation();


  const { id } = useParams();

  useEffect(() => {
    if(id){
        dispatch(fetchProductbyids(id))
    }
 
  }, [dispatch,id]);

  return (
    <div>
      <Loading loading={loading} error={error}>
    
         
              <Card
                body
               className="m-1"
              >
                <CardBody>
                  
                  

                  
                 
                      <div
                       
                        className="m-1  d-flex align-items-center"
                      >
                      <div
                 
                        style={{width:"10rem"}}
                        className="d-flex m-1 "
                       
                      >
                        
                        
                        <img
                          src={productsData[0]?.img}
                          alt={productsData[0]?.title}
                        />
                       
                      </div>
                      <div>
                      <div className="m-1">{productsData[0]?.title}</div>
                      <div className="m-1">{t("EGP")}{productsData[0]?.price}</div>
                      </div>
                     </div>
                    
                 
                 
                
                  
                </CardBody>
                
              </Card>
          
      
      </Loading>
    </div>
  );
};

export default OrderHistory;
