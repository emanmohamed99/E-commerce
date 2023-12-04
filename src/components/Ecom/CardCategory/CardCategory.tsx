
import Style from "./Card.module.css";

import { useNavigate } from "react-router-dom";
import { CardBody,CardTitle ,Card} from 'reactstrap';

  type categoryType = {
    id: number;
    title: string;
    prefix: string;
    img: string;
}


const CardCategory = ({title,prefix,img}:categoryType) => {

  const navigate = useNavigate();

  return (
    
    <div className={Style.card}>
     
     <Card 
    style={{
      width: '13rem'
    } } onClick={() => navigate(`${prefix}`)}
  >
    <img src={img} alt={title} />
    <CardBody>
    <CardTitle tag="h5">
    {title}
      </CardTitle>
      </CardBody>
   
  </Card>
  </div>
  );
};

export default CardCategory;
