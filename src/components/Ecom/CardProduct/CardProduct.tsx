import style from "./CardProduct.module.css";

import { useAppDispatch } from "../../../Hooks/hooks";

import {addToCart ,} from "../../../store/cart/cartSlice";

import { CardBody,CardTitle ,CardText,Button,Card, CardSubtitle} from 'reactstrap';
import { product } from "../../../store/product/types";




type productProps = {
  id: number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
  max_quantity: number;
  items: { [id: string]: {
    product:product,
    quantity:number,
   
  } };
};



const CardProduct = ({
  id,
  title,
  price,
  cat_prefix,
  img,
  max_quantity,
  items,
}: productProps) => {
  const dispatch = useAppDispatch();


const max_quantity2=items[id]?max_quantity - items[id].quantity:max_quantity


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
        Available Quantity  :
        
        {max_quantity2 }
      </CardSubtitle>
      <CardText>
      {price}
      </CardText>
      {max_quantity2?
      <Button disabled={false}
            onClick={() =>{
              dispatch(addToCart({ id,
                title,
                price,
                cat_prefix,
                img,
                max_quantity}))        
           
            }
          }
          >
            Add to Cart
          </Button>: <Button disabled={true}
            onClick={() =>{
              dispatch(addToCart({ id,
                title,
                price,
                cat_prefix,
                img,
                max_quantity}))        
           
            }
          }
          >
            Add to Cart
          </Button>}
    </CardBody>
  </Card>
    </div>
  );
};

export default CardProduct;
