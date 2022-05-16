import React from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Row, Col, ListGroup, Button } from "react-bootstrap";

const CardsCompact = (props) => {

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
            <Card className="h-100">
              <ListGroup variant="flush">
                <ListGroup.Item variant="primary" className="d-flex p-0 m-0">
                    <div className="p-0 m-0 w-25 d-flex align-items-center border-end border">
                    <p style={{ fontSize: ".6rem" }} className="p-0 m-2">
                    Manufacturer
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h6 className="p-0 m-0 ms-2">{part.partManufacturer}</h6>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".6rem" }} className="p-0 m-2">
                      Model
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <h6 className="p-0 m-0 ms-2">{part.partModel}</h6>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".6rem" }} className="p-0 m-2">
                      Quantity
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <p style={{ fontSize: ".8rem" }} className="p-0 m-0 ms-2">{part.partQuantity}</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".6rem" }} className="p-0 m-2">
                      Category
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <p style={{ fontSize: ".8rem" }} className="p-0 m-0 ms-2">{part.category.categoryName}</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-0 m-0 w-25 d-flex align-items-center border-end">
                    <p style={{ fontSize: ".6rem" }} className="p-0 m-2">
                      Released
                    </p>
                  </div>
                  <div className="p-0 m-0 d-flex align-items-center">
                    <p style={{ fontSize: ".8rem" }} className="p-0 m-0 ms-2">{mySqlDateConvert(part.partReleased)}</p>
                  </div>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex p-0 m-0">
                  <div className="p-1 m-0 w-100 d-flex align-items-center justify-content-evenly">
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

export default CardsCompact;
