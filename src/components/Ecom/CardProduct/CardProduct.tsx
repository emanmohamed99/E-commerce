

import { useAppDispatch } from "../../../Hooks/hooks";

import {addToCart ,} from "../../../store/cart/cartSlice";

import { CardBody,CardTitle ,CardText,Button,Card, CardSubtitle} from 'reactstrap';
import { useTranslation } from "react-i18next";



// Import Swiper styles
import 'swiper/css';



type productProps = {
  id: number;
  title: string;
  price: string;
  cat_prefix: string;
  img: string;
  max_quantity: number;
  items: { [id: string]: {
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

const { t } = useTranslation();
  return (
    <div>
  
      <Card
    style={{
      width: '12rem',
      margin:"1em"
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
        { t("Available Quantity")}  :
        
        {max_quantity2 }
      </CardSubtitle>
      <CardText>
        {t("price")}:{" "}
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
           { t("Add to cart")}
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
            { t("Add to cart")}
          </Button>}
    </CardBody>
  </Card>

    </div>
  );
};

export default CardProduct;
