
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowUp} from "@fortawesome/free-solid-svg-icons"
import {
    MDBFooter,
    MDBContainer,
  } from 'mdb-react-ui-kit';
import { Button } from 'reactstrap';
import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
  return (
    <div>
        
  <MDBFooter className='text-center text-white bg-dark h-auto p-3' >
 
      <MDBContainer className='p-4 pb-0'>
        <div className='d-flex w-100  justify-content-around'>
        <section  className=''>
          <div>{t("E-commerce is the activity of buying or selling of products on online services or over the Internet")}</div>
        </section>
        <div className=' d-flex  justify-content-center' style={{height:"fit-content"}}>
        <Button className=' h-auto' outline color="light" rounded="true"
        onClick={() => {
          window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
        }}
       
      >
     <FontAwesomeIcon icon={faArrowUp} />
      </Button>
      </div></div>
      <div className='text-center p-3 w-100 m-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2024 {t("E-commerce")}.
        <span className='text-white ms-1 me-1'>
        {t("All Rights Reserved")} 
        </span>
      </div>
     
      </MDBContainer>
    </MDBFooter>
    </div>
  );
}
 

export default Footer;
