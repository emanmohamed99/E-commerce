
import Style from "./Card.module.css";

import { useNavigate } from "react-router-dom";
import { CardBody,CardTitle ,Card} from 'reactstrap';

  type categoryProps = {
    id: number;
    title: string;
    prefix: string;
    img: string;
}

const CardCategory = ({title,prefix,img}:categoryProps) => {

  const navigate = useNavigate();

  return (
    
    <div className={Style.card}style={{
      boxShadow: 'none',
    
    } }>
     
     <Card 
    style={{
      width: '13rem',
      border:"none"

    } } onClick={() => navigate(`${prefix}`)}
  >
    <img src={img} alt={title} className="rounded-circle" />
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
