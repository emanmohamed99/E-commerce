import style from "./CardProduct.module.css";

import { useAppDispatch } from "../../../Hooks/hooks";

import { addToCart } from "../../../store/cart/cartSlice";

import { CardBody,CardTitle ,CardSubtitle,CardText,Button,Card} from 'reactstrap';
type productType = {
  id: number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
  max_quantity: number;
};

const CardProduct = ({
  id,
  title,
  price,
  cat_prefix,
  img,
  max_quantity,
}: productType) => {
  const dispatch = useAppDispatch();
  return (
   
      <div className={style.cardWrapper}>
      <Card
    style={{
      width: '18rem'
    }}
  >
      <img src={img} alt={title} />
    <CardBody>
      <CardTitle tag="h5">
      {title}
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
      {price}
      </CardText>
      <Button
            onClick={() =>
              dispatch(
                addToCart({ id, title, price, cat_prefix, img, max_quantity })
              )
            }
          >
            Add to Cart
          </Button>
    </CardBody>
  </Card>
    </div>
  );
};

export default CardProduct;
