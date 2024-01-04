import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";


import { useAppDispatch, useAppSelector } from "../Hooks/hooks";

import { useEffect } from "react";
import { fetchProducts } from "../store/product/thunk/getProduct";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useTranslation } from "react-i18next";
import {  Navigation, Pagination, A11y  } from "swiper/modules";
import { Loading } from "../components/Ecom";
import { Button, CardText } from "react-bootstrap";
import { addToCart } from "../store/cart/cartSlice";
import { useNavigate } from "react-router-dom";




const Home = () => {
  const dispatch = useAppDispatch();
  const { products, loading, error } = useAppSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const numberOfElements = 5; // Number of elements to retrieve from the end
  const lastElements = products.slice(-numberOfElements).reverse();
  const { t,i18n } = useTranslation();
const navigate=useNavigate()
  const dir = i18n.dir(i18n.language);
  const items = useAppSelector((state) => state.cart.items);
  // const swiperProducts = products.slice(5,10)
  return (
    <Loading loading={loading} error={error}>
      <div className="m-2">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
       
          pagination={{
            clickable: true,
          }}
          dir={dir}
          key={dir}
      style={{marginBottom:"10px"}}
        
        >
       
            <SwiperSlide
       
              className="d-flex justify-content-center"
            >
            <div style={{height:"7.5em",position:"relative",width:"100%",cursor:"pointer"}}> {dir==="ltr"?<img src="../../public/images/cover1.webp" alt={t("coverImg")}  onClick={()=>{navigate("/main/category")}}/>:
            <img src="../../public/images/cover1Arabic.png" alt={t("coverImg")} onClick={()=>{navigate("/main/category")}}  /> } 
            
        </div>
            </SwiperSlide>
            <SwiperSlide
       
       className="d-flex justify-content-center"
     >
        <div style={{position:"relative",width:"100%",cursor:"pointer"}}> 
        {dir==="ltr"?<img src="../../public/images/cover2.png"  alt={t("coverImg")}  onClick={()=>{navigate("/main/category")}} />
        :<img src="../../public/images/cover2Arabic.png"  alt={t("coverImg")}  onClick={()=>{navigate("/main/category")}} />
      }
  
         </div>
     </SwiperSlide>
        </Swiper>
        <h4 className="ms-4 me-4 d-none d-lg-block">     { t("Recommended for you")}</h4>
        <h4 className="ms-4 me-4 text-center d-lg-none">   { t("Recommended for you")}</h4>
        <div className="d-flex justify-content-center  justify-content-sm-between flex-wrap m-4 ">
          {lastElements.map((product) => (
              <Card
              style={{
                width: '12rem',
                margin:"1em"
              }}
              key={product.id}
            >
                <img src={product.img} alt={product.title} />
              <CardBody>
                <CardTitle tag="h5">
                {product.title}
                </CardTitle>
                <CardSubtitle
                  className="mb-2 text-muted"
                  tag="h6"
                >
                  { t("Available Quantity")}  :
                  
                  {items[product.id]?product.max_quantity - items[product.id].quantity:product.max_quantity }
                </CardSubtitle>
                <CardText>
                  {t("price")}:{" "}
                {product.price}
                </CardText>
                {(items[product.id]?product.max_quantity - items[product.id].quantity:product.max_quantity)?
                <Button disabled={false}
                      onClick={() =>{
                        dispatch(addToCart( product))        
                     
                      }
                    }
                    >
                     { t("Add to cart")}
                    </Button>: <Button disabled={true}
                      onClick={() =>{
                        dispatch(addToCart(product))        
                     
                      }
                    }
                    >
                      { t("Add to cart")}
                    </Button>}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Loading>
  );
};

export default Home;
