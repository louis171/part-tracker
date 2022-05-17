import React from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

const Filters = (props) => {

    // Destructuring props
  const {
    handleSearchChange,
    searchValue,
    changeCategoryHandler,
    categories,
    changeYearHandler,
    released,
    cardSizeHandler,
    cardSize,
  } = props;

  return (
    <div className="bg-light p-2 m-2 rounded shadow-sm border">
      <Container>
        <Form>
          <Row
            className="d-flex justify-content-evenly"
            xs={12}
            sm={12}
            md={6}
            lg={4}
          >
            <Col className="mb-2" xs={12} sm={12} md={6} lg={4} xl={4}>
              <InputGroup>
                <Form.Control
                  onChange={handleSearchChange}
                  value={searchValue}
                  placeholder="Search"
                  aria-label="Username"
                />
              </InputGroup>
            </Col>
            <Col className="mb-2" xs={6} sm={6} md={6} lg={4} xl={4}>
              <Form.Select
                onChange={changeCategoryHandler}
                aria-label="categorySelect"
              >
                <option key="999">All Categories</option>
                {categories.map((category) => (
                  <option key={category.categoryId}>
                    {category.categoryName}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col className="mb-2" xs={6} sm={6} md={6} lg={2} xl={3}>
              <Form.Select onChange={changeYearHandler} aria-label="yearSelect">
                <option key="999">All Years</option>
                {released.map((release) => (
                  <option key={release.partId}>
                    {new Date(release.partReleased).getFullYear()}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col
              className="text-center mb-2"
              xs={12}
              sm={12}
              md={6}
              lg={2}
              xl={1}
            >
              <Button aria-label="cardSizeToggle" onClick={cardSizeHandler}>
                {cardSize ? "Small" : "Large"}
              </Button>
            </Col>
          </Row>
        </Form>
      </Container>
    </div>
  );
};

export default Filters;
