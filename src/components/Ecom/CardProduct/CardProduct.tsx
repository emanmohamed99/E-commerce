import style from "./CardProduct.module.css";

import { useAppDispatch } from "../../../Hooks/hooks";

import { addToCart } from "../../../store/cart/cartSlice";

import { CardBody,CardTitle ,CardSubtitle,CardText,Button,Card} from 'reactstrap';
import { product } from "../../../store/product/types";
type productProps = {
  item:product
};

const CardProduct = ({
  item
}: productProps) => {
  const dispatch = useAppDispatch();
  return (
   
      <div className={style.cardWrapper}>
      <Card
    style={{
      width: '18rem'
    }}
  >
      <img src={item.img} alt={item.title} />
    <CardBody>
      <CardTitle tag="h5">
      {item.title}
      </CardTitle>
      <CardSubtitle
        className="mb-2 text-muted"
        tag="h6"
      >
        Card subtitle
      </CardSubtitle>
      <CardText>
      {item.price}
      </CardText>
      <Button
            onClick={() =>
              dispatch(
                addToCart(item)
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
