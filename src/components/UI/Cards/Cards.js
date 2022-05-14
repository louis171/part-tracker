import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { ListGroup, Row, Col } from "react-bootstrap";

const Cards = (props) => {
  return (
    <Container className="bg-light p-4 mt-4 border rounded shadow">
      <Row>
        {props.filteredParts.map((part) => (
          <Col
            key={part.partId}
            sm
            className="col-lg-4 col-md-6 col-sm-12 mb-4"
          >
            <Card style={{ cursor: "pointer" }} className="h-100">
              <ListGroup variant="flush">
                <ListGroup.Item variant="primary" className="d-flex">
                  <div className="me-auto">
                    <div className="lead">Manufacturer</div>
                    <h3>{part.partManufacturer}</h3>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".7rem" }} className="p-0 m-2">Model</p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h5 className="p-0 m-2">{part.partModel}</h5>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".7rem" }} className="p-0 m-2">Quantity</p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h5 className="p-0 m-2">{part.partQuantity}</h5>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".7rem" }} className="p-0 m-2">Category</p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h5 className="p-0 m-2">{part.category.categoryName}</h5>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Cards;
