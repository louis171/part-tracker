// React imports
import React from "react";
import { useState, useEffect } from "react";

// React Bootstrap imports
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Handlers from "./Functions/Handlers";

// Components imports
import Layout from "./components/Layout/Layout";
import Cards from "./components/UI/Cards/Cards";
import Loading from "./components/UI/Loading";
import CardsCompact from "./components/UI/Cards/CardsCompact";
import Filters from "./components/UI/Filtering/Filters";

import { baseURL } from "./API/baseUrl";
import AddModal from "./components/Modal/AddModal";
import EditModal from "./components/Modal/EditModal";
import Success from "./components/Alerts/Success";
import CardRow from "./components/UI/Cards/CardRow";

function App() {
  // Loading initialised as false. useEffect will then set true when loading complete
  const [loading, setLoading] = useState(true);
  // Used for refreshing data (calls DB)
  const [refresh, setRefresh] = useState(false);
  // State for parts that are returned from DB and filtered
  const [parts, setParts] = useState([]);
  const [filteredParts, setFilteredParts] = useState([]);

  // States for filters/options
  const [searchValue, setSearchValue] = useState("");
  const [categorySearchValue, setCategorySearchValue] = useState("");
  const [yearSearchValue, setYearSearchValue] = useState(999);
 // State for holding view type (0, 1, 2)
  const [viewType, setViewType] = useState(0);

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
        // Filters for unique years in returned data
        const uniqueYears = data.filter(
          (value, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                new Date(t.partReleased).getFullYear() ===
                new Date(value.partReleased).getFullYear()
            )
        );
        // Sorted years in descending order
        const sortedYears = []
          .concat(uniqueYears)
          .sort((a, b) =>
            new Date(a.partReleased).getFullYear() <
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
        // Sets loading to false once all data is fetched and sorted
        if (loading) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
        setRefresh(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  // useEffect for filtering by category
  useEffect(() => {
    if (categorySearchValue === 999) {
      setFilteredParts(parts);
    } else {
      setFilteredParts(
        parts.filter((part) => part.partCategoryId === categorySearchValue)
      );
    }
  }, [parts, categorySearchValue]);

  // useEffect for filtering by search string
  useEffect(() => {
    setFilteredParts(
      parts.filter((part) => {
        return part.partModel.toLowerCase().includes(searchValue.toLowerCase());
      })
    );
  }, [parts, searchValue]);

  // useEffect for filtering by year
  useEffect(() => {
    if (yearSearchValue === 999) {
      setFilteredParts(parts);
    } else {
      setFilteredParts(
        parts.filter(
          (part) =>
            new Date(part.partReleased).getFullYear() === yearSearchValue
        )
      );
    }
  }, [parts, yearSearchValue]);

  // Sets state for string search
  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  // Filters for categoryId and sets state
  const changeCategoryHandler = (e) => {
    if (e.target.value === "All Categories") {
      setCategorySearchValue(999);
    } else {
      const value = categories.filter((item) => {
        return item.categoryName === e.target.value;
      });
      setCategorySearchValue(value[0].categoryId);
    }
  };

  // Sets state for year filter
  const changeYearHandler = (e) => {
    if (e.target.value === "All Years") {
      setYearSearchValue(999);
    } else {
      setYearSearchValue(parseInt(e.target.value));
    }
  };

  // Set state from select in Filters.js
  const viewChangeHandler = (e) => {
    setViewType(e.target.value);
  };

  // Returns loading page when data is loading
  if (loading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Container className="p-2 m-2">
        <AddModal
          baseURL={baseURL}
          urlTarget="/parts/create"
          refreshDataHandler={() => Handlers.refreshDataHandler(setRefresh)}
          categories={categories}
        />
        <EditModal
          baseURL={baseURL}
          urlTarget="/parts/update"
          refreshDataHandler={() => Handlers.refreshDataHandler(setRefresh)}
          categories={categories}
        />
        <Success />
      </Container>
      <Filters
        handleSearchChange={handleSearchChange}
        searchValue={searchValue}
        changeCategoryHandler={changeCategoryHandler}
        categories={categories}
        changeYearHandler={changeYearHandler}
        released={released}
        viewChangeHandler={viewChangeHandler}
      />
      <Container>

        <Row>
          <Col>
            {viewType == 0 ? (
              <Cards
                baseURL={baseURL}
                setFilteredParts={setFilteredParts}
                filteredParts={filteredParts}
              />
            ) : viewType == 1 ? (
              <CardsCompact
                baseURL={baseURL}
                setFilteredParts={setFilteredParts}
                filteredParts={filteredParts}
              />
            ) : viewType == 2 ? (
              <CardRow
                baseURL={baseURL}
                setFilteredParts={setFilteredParts}
                filteredParts={filteredParts}
              />
            ) : null}
          </Col>
        </Row>

      </Container>
    </Layout>
  );
}

export default App;
