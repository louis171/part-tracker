import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { ListGroup, Row, Col, Button } from "react-bootstrap";

const Cards = (props) => {

  const { baseURL } = props;

  const deleteCardHandler = (part) => {
    const value = props.filteredParts.filter((filteredPart) => {
      return filteredPart.partId !== part.partId;
    });
    props.setFilteredParts(value);
    const requestOptions = {
      method: "DELETE",
    };
    fetch(`${baseURL}/parts/delete?partId=${part.partId}`, requestOptions)
      .then((res) => res.json()) // or res.json()
      .then((res) => console.log(res));
  };

  const mySqlDateConvert = (date) => {
    const formatDate = new Date(date).toDateString();
    return formatDate;
  }

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
                <ListGroup.Item style={{ height: "300px" }} className="w-100">
                  <img
                    style={{ width: "280px" }}
                    src={part.image[0].imagePath}
                  ></img>
                </ListGroup.Item>
                <ListGroup.Item variant="primary" className="d-flex">
                  <div className="me-auto">
                    <div style={{ fontSize: ".9rem" }} className="lead">
                      Manufacturer
                    </div>
                    <h4>{part.partManufacturer}</h4>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".7rem" }} className="p-0 m-2">
                      Model
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h5 className="p-0 m-2">{part.partModel}</h5>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".7rem" }} className="p-0 m-2">
                      Quantity
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h6 className="p-0 m-2">{part.partQuantity}</h6>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".7rem" }} className="p-0 m-2">
                      Category
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h6 className="p-0 m-2">{part.category.categoryName}</h6>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".7rem" }} className="p-0 m-2">
                      Released
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h6 className="p-0 m-2">{mySqlDateConvert(part.partReleased)}</h6>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-2 m-0 w-100 d-flex align-items-center justify-content-evenly">
                    <Button
                      onClick={() => deleteCardHandler(part)}
                      variant="outline-danger"
                    >
                      Delete
                    </Button>
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
