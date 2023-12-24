
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
    
    <Card className={Style.card}style={{
      boxShadow: 'none',
     border:"none"
    } }>
     
     <div 
    style={{
      width: '13rem',
     

    } } onClick={() => navigate(`${prefix}`)}
  >
    <img src={img} alt={title} className="rounded-circle" />
    <CardBody>
    <CardTitle tag="h5">
    {title}
      </CardTitle>
      </CardBody>
   
  </div>
  </Card>
  );
};

export default CardCategory;
