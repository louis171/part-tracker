import React from 'react';
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

const PartsTable = (props) => {

  const { filteredParts } = props;

  return (
    <Container>
      <Table size="sm" responsive striped borderless hover>
        <thead>
          <tr>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Quantity</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {filteredParts.map((part) => (
            <tr key={part.partId}>
              <td style={{ width: "20%" }}>{part.partManufacturer}</td>
              <td style={{ width: "50%" }}>{part.partModel}</td>
              <td style={{ width: "10%" }}>{part.partQuantity}</td>
              <td style={{ width: "20%" }}>{part.category.categoryName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default PartsTable;
