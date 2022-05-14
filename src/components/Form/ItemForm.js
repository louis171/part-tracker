import { useState } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const baseURL = "http://localhost:4000/api";

const ItemForm = (props) => {
  const [userManufacturer, setUserManufacturer] = useState("");
  const [userModel, setUserModel] = useState("");
  const [userQuantity, setUserQuantity] = useState(1);
  const [userCategory, setUserCategory] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        partManufacturer: userManufacturer,
        partModel: userModel,
        partQuantity: userQuantity,
        partCategoryId: userCategory,
      }),
    };
    fetch(`${baseURL}${props.urlTarget}`, requestOptions)
      .then((response) => response.json())
      .then(props.refreshDataHandler)
      .then(props.showAddPartForm);
  };

  const changeCategoryHandler = (e) => {
    const value = props.categories.filter((item) => {
      return item.categoryName === e.target.value;
    });
    setUserCategory(value[0].categoryId);
  };

  const changeModelHandler = (e) => {
    setUserModel(e.target.value);
  };

  const changeManufacturerHandler = (e) => {
    setUserManufacturer(e.target.value);
  };

  const changeQuantityHandler = (e) => {
    setUserQuantity(e.target.value);
  };

  return (
    <Container fluid="md">
      <Form
        onSubmit={handleSubmit}
        className="bg-light p-4 m-2 rounded shadow-sm border"
      >
        <Row className="mb-2 text-center">
          <h3>Add new item</h3>
        </Row>
        <Row className="mb-2">
          <Form.Group
            as={Col}
            sm={12}
            md={12}
            lg={6}
            className="mb-2"
            controlId="formManufacturer"
          >
            <Form.Label>Manufacturer</Form.Label>
            <Form.Control
              required
              value={userManufacturer}
              onChange={changeManufacturerHandler}
              type="text"
              placeholder="Manufacturer"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            sm={12}
            md={12}
            lg={6}
            className="mb-2"
            controlId="formModel"
          >
            <Form.Label>Model</Form.Label>
            <Form.Control
              required
              value={userModel}
              onChange={changeModelHandler}
              type="text"
              placeholder="Model"
            />
          </Form.Group>
        </Row>
        <Row className="mb-2">
          <Form.Group
            as={Col}
            sm={12}
            md={12}
            lg={6}
            className="mb-2"
            controlId="formQuantity"
          >
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              value={userQuantity}
              onChange={changeQuantityHandler}
              type="number"
              placeholder="0"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            sm={12}
            md={12}
            lg={6}
            className="mb-2"
            controlId="formCategory"
          >
            <Form.Label>Category</Form.Label>
            <Form.Select
              onChange={changeCategoryHandler}
              aria-label="categorySelect"
            >
              <option key="999"></option>
              {props.categories.map((category) => (
                <option key={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-center">
          <Col sm={12} md={12} lg={2} className="d-flex justify-content-evenly">
            <Button type="submit" className="mx-2" variant="primary">
              Submit
            </Button>
            <Button className="mx-2" variant="secondary">
              Close
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
};

export default ItemForm;
