import React from "react";
import { useState, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

import Layout from "./components/Layout/Layout";
import ItemForm from "./components/Form/ItemForm";
//import PartsTable from "./components/UI/PartsTable/PartsTable";
import Cards from "./components/UI/Cards/Cards";
import Loading from "./components/UI/Loading";

const baseURL = "http://localhost:4000/api";

function App() {
  // Loading state. Initialised as false. useEffect will then set true when loading complete
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  // State for add new part form
  const [showForm, setShowForm] = useState(false);
  // State for parts that are returned from DB
  const [parts, setParts] = useState([]);
  // State for filters
  const [filteredParts, setFilteredParts] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [categorySearchValue, setCategorySearchValue] = useState("");

  // Categories that are returned from DB
  const [categories, setCategories] = useState();
  // Released years from DB
  const [released, setReleased] = useState();

  useEffect(() => {
    // READ all category names
    fetch(`${baseURL}/categories`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });

    // READ all parts RELEASED dates
    fetch(`${baseURL}/parts/released`)
      .then((response) => response.json())
      .then((data) => {
        const uniqueYears = data.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                new Date(t.partReleased).getFullYear() ===
                new Date(value.partReleased).getFullYear()
            )
        );
        const sortedYears = []
          .concat(uniqueYears)
          .sort((a, b) =>
            new Date(a.partReleased).getFullYear() >
            new Date(b.partReleased).getFullYear()
              ? 1
              : -1
          );
        setReleased(sortedYears);
      })
      .catch((err) => {
        console.log(err);
      });

    //READ all parts with category names
    fetch(`${baseURL}/parts`)
      .then((response) => response.json())
      .then((data) => {
        setParts(data);
        setLoading(false);
        setRefresh(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const refreshDataHandler = () => {
    setRefresh(true);
  };

  const showAddPartForm = () => {
    setShowForm((prevShowForm) => !prevShowForm);
  };

  useEffect(() => {
    if (categorySearchValue === 999) {
      setFilteredParts(parts);
    } else {
      setFilteredParts(
        parts.filter((part) => part.partCategoryId === categorySearchValue)
      );
    }
  }, [parts, categorySearchValue]);

  useEffect(() => {
    setFilteredParts(
      parts.filter((part) => {
        return part.partModel.toLowerCase().includes(searchValue.toLowerCase());
      })
    );
  }, [parts, searchValue]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const changeCategoryHandler = (e) => {
    if (e.target.value === "All") {
      setCategorySearchValue(999);
    } else {
      const value = categories.filter((item) => {
        return item.categoryName === e.target.value;
      });
      setCategorySearchValue(value[0].categoryId);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container className="p-2 m-2">
        <Button onClick={showAddPartForm}>{showForm ? "Cancel" : "Add"}</Button>
        {showForm ? (
          <ItemForm
            baseURL={baseURL}
            urlTarget="/parts/create"
            showAddPartForm={showAddPartForm}
            refreshDataHandler={refreshDataHandler}
            categories={categories}
          />
        ) : null}
      </Container>
      <div className="bg-light p-2 m-2 rounded shadow-sm border">
        <Container className="pb-2 border-bottom">
          <Form>
            <Row
              className="d-flex justify-content-evenly"
              xs={2}
              sm={6}
              md={6}
              lg={4}
            >
              <Col xs={6} sm={6} md={6} lg={4} xl={4}>
                <InputGroup>
                  <Form.Control
                    onChange={handleSearchChange}
                    value={searchValue}
                    placeholder="Search"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                </InputGroup>
              </Col>
              <Col xs={4} sm={6} md={6} lg={4} xl={4}>
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
              <Col xs={4} sm={6} md={6} lg={4} xl={4}>
                <Form.Select aria-label="categorySelect">
                  <option key="999">All Years</option>
                  {released.map((release) => (
                    <option key={release.partId}>
                      {new Date(release.partReleased).getFullYear()}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Row>
          </Form>
        </Container>
        {/* <PartsTable filteredParts={filteredParts} /> */}
      </div>
      <Container>
        <Row>
          <Col>
            <Cards
              baseURL={baseURL}
              setFilteredParts={setFilteredParts}
              filteredParts={filteredParts}
            />
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default App;
