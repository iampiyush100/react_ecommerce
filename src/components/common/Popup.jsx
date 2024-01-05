import React, { useState } from "react";
import { Container, Row, Col, Image, ListGroup, ListGroupItem, Button } from "react-bootstrap";

const Popup = (prop) => {
  return <>
  <Container
  style={{
    marginTop: '200px',
    width: "20%",
    height: "200px",
    border: '1px solid black',
    borderRadius: '10px',
    // display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    // background: 'rgba(0, 0, 0, 0.6)',
    background: 'grey',
    position: 'fixed',
    display: `${prop.isVisible === false ? 'none' : 'block'}`,
    zIndex: 2, 
  }}
  >
    <Row style={{color: 'white', textAlign: 'center', marginTop: '50px', marginLeft: '5px'}}>
      DO YOU WANT TO REMOVE THE ITEM?
      </Row>
    <Row style={{color: 'white', textAlign: 'center', marginTop: '20px', marginLeft: '5px'}}>
      <Col>
      <Button onClick={() => {prop?.changeIsVisible(false)}}>Cancel</Button>
      </Col>
      <Col>
      <Button onClick={prop.handleOnConfirm}>Confirm</Button>
      </Col>
    </Row>
  </Container>
  </>
};

export default Popup;
