import { Card, CardBody, CardTitle, Pagination } from "reactstrap";

import "swiper/css";
import { useAppDispatch, useAppSelector } from "../Hooks/hooks";

import { useEffect } from "react";
import { fetchProducts } from "../store/product/thunk/getProduct";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import { useTranslation } from "react-i18next";
import { Navigation, Scrollbar } from "swiper/modules";
import { Loading } from "../components/feedback";

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
  const { i18n } = useTranslation();

  const dir = i18n.dir(i18n.language);

  return (
    <Loading loading={loading} error={error}>
      <div className="m-2">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar]}
          spaceBetween={50}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
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
              slidesPerView: 5,
              spaceBetween: 50,
            },
          }}
        >
          {products.map((product) => (
            <SwiperSlide
              key={product.id}
              className="d-flex justify-content-center"
            >
              <Card
                style={{
                  width: "13rem",
                  marginBottom: "1rem",
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
        <div className="d-flex justify-content-center  justify-content-sm-between flex-wrap m-4 ">
          {lastElements.map((product) => (
            <Card
              key={product.id}
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
