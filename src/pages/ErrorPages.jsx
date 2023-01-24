import React from 'react'
import {Container,Row,Col,Button} from "react-bootstrap";
import { useRouteError,useNavigate } from "react-router-dom";

const ErrorPages = () => {
    const error = useRouteError();
  const navigate=useNavigate();
  return    <Container>
  <Row>
    <Col xs={{ span: 8, offset: 2 }}>
    <div id="error-page" className='mt-5 text-center'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <Button variant="link" onClick={()=> navigate("/",{replace:true})}>Link</Button>

    </div>
    </Col>
  </Row>
</Container>
}

export default ErrorPages