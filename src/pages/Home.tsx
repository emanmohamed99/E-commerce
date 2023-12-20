import { Card, CardBody, CardTitle, Pagination } from "reactstrap";

import style from "../components/Ecom/CardProduct/CardProduct.module.css";
// Import Swiper styles
import "swiper/css";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";
import Loading from "../components/Ecom/Loading/Loading";
import { useEffect } from "react";
import { fetchProducts } from "../store/product/thunk/getProduct";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Scrollbar } from "swiper/modules";

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

  return (
    <Loading loading={loading} error={error}>
      <div className={style.cardWrapper}>
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
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
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide>
              <Card
                style={{
                  width: "13rem",
                }}
              >
                {" "}
                <img src={product.img} alt={product.title} />
                <CardBody>
                  <CardTitle tag="h6">{product.title}</CardTitle>{" "}
                </CardBody>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={style.lastEleWrapper}>
          {lastElements.map((product) => (
            <Card
              style={{
                width: "13rem",
                margin: "1em 0",
              }}
            >
              {" "}
              <img src={product.img} alt={product.title} />
              <CardBody>
                <CardTitle tag="h6">{product.title}</CardTitle>{" "}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </Loading>
  );
};

export default Home;
