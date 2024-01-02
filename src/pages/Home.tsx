import { Card, CardBody, CardSubtitle, CardTitle } from "reactstrap";

import "swiper/css";
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

  const dir = i18n.dir(i18n.language);
  const items = useAppSelector((state) => state.cart.items);
  const swiperProducts = products.slice(5,10)
  return (
    <Loading loading={loading} error={error}>
      <div className="m-2">
        <Swiper
          modules={[Navigation, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={3}
          navigation
       
          pagination={{
            clickable: true,
          }}
          dir={dir}
          key={dir}
          breakpoints={{
            // when window width is >= 320px
            320: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            // when window width is >= 480px
            480: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            // when window width is >= 768px
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            // when window width is >= 1024px
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {swiperProducts.map((product) => (
            <SwiperSlide
              key={product.id}
              className="d-flex justify-content-center"
            >
              <Card
                style={{
                  width: "20rem",
                  marginBottom: "2rem",
                }}
              >
                {" "}
                <img src={product.img} alt={product.title} />
                <div>
                  {/* <CardTitle tag="h6">{product.title}</CardTitle>{" "} */}
                </div>
              </Card>
            </SwiperSlide>
          ))}
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
