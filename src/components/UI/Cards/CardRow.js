import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { ListGroup, Row, Col, Button, Table } from "react-bootstrap";
import { PartContext } from "../../../Context/partContext";
import { ModalContext } from "../../../Context/modalContext";

const CardRow = (props) => {
  const { baseURL } = props;
  const { setSelectedPart } = useContext(PartContext);
  const { setEditModal } = useContext(ModalContext);

  const deleteCardHandler = (part) => {
    const value = props.filteredParts.filter((filteredPart) => {
      return filteredPart.partId !== part.partId;
    });
    props.setFilteredParts(value);
    const requestOptions = {
      method: "DELETE",
      body: JSON.stringify({ imagePath: part.imagePath }),
    };
    fetch(`${baseURL}/parts/delete?partId=${part.partId}`, requestOptions)
      .then((res) => res.json()) // or res.json()
      .then((res) => console.log(res));
  };

  const mySqlDateConvert = (date) => {
    const formatDate = new Date(date).toDateString();
    return formatDate;
  };

  return (
    <Container className="bg-light p-4 mt-4 border rounded shadow">
      <Row>
        <Table hover striped>
          <thead>
            <tr>
              <th>Manufacturer</th>
              <th>Model</th>
              <th>Quantity</th>
              <th>Category</th>
              <th>Released</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {props.filteredParts.map((part) => (
              <tr key={part.partId}>
                <td>{part.partManufacturer}</td>
                <td>{part.partModel}</td>
                <td>{part.partQuantity}</td>
                <td>{part.category.categoryName}</td>
                <td>{mySqlDateConvert(part.partReleased)}</td>
                <td>
                  <Button
                    onClick={() => {
                      setEditModal(true);
                      setSelectedPart({
                        partId: part.partId,
                        partManufacturer: part.partManufacturer,
                        partModel: part.partModel,
                        partCreated: part.partCreated,
                        partUpdated: part.partUpdated,
                        partQuantity: part.partQuantity,
                        partCategoryId: part.category.categoryId,
                        partReleased: part.partReleased,
                        partCategoryName: part.category.categoryName,
                        imagePath: part.image[0].imagePath,
                        imageId: part.image[0].imageId,
                      });
                    }}
                    variant="outline-primary"
                  >
                    Edit
                  </Button>
                  <Button
                    onClick={() => deleteCardHandler(part)}
                    variant="outline-danger"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default CardRow;
