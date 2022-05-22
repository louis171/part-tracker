import React, { useContext, useState } from "react";
import { PartContext } from "../../Context/partContext";
import { ModalContext } from "../../Context/modalContext";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

import { baseURL } from "../../API/baseUrl";
import { ModalBody } from "react-bootstrap";

const EditModal = (props) => {
  // Context for selected part and modal show status
  const { selectedPart, setSelectedPart } = useContext(PartContext);
  const { setEditModal, editModal } = useContext(ModalContext);

  // State for uploaded iamge
  const [userImage, setUserImage] = useState({ image: null });
  // State for image preview. Stored as URL.createObjectURL
  const [userImagePreview, setUserImagePreview] = useState({ image: null });

  // Handles form submission
  const handleSubmit = (event) => {
    event.preventDefault();

    // Builds formdata
    const formData = new FormData();
    const releaseDateTime = new Date(selectedPart.partReleased).toISOString();
    formData.append("partManufacturer", selectedPart.partManufacturer);
    formData.append("partModel", selectedPart.partModel);
    formData.append("partReleased", releaseDateTime);
    formData.append("partQuantity", selectedPart.partQuantity);
    formData.append("partCategoryId", selectedPart.partCategoryId);
    if (userImage.image !== null) {
      const imageFormData = new FormData();
      imageFormData.append("partImageUpdate", userImage.image);
      const requestOptionsImage = {
        method: "PUT",
        body: imageFormData,
      };
      fetch(
        `${baseURL}/parts/image/update?imageId=${selectedPart.imageId}`,
        requestOptionsImage
      )
        .then((response) => response.json())
        .then((data) => console.log(data))
        .then(clearImageFormData);
    }

    const requestOptions = {
      method: "PUT",
      body: formData,
    };
    fetch(
      `${baseURL}${props.urlTarget}?partId=${selectedPart.partId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(setEditModal(false))
      .then(props.refreshDataHandler);
  };

  const clearImageFormData = () => {
    setUserImage({ image: null });
    setUserImagePreview({ image: null });
  };

  const changeCategoryHandler = (e) => {
    const value = props.categories.filter((item) => {
      return item.categoryName === e.target.value;
    });
    setSelectedPart({
      ...selectedPart,
      partCategoryId: value[0].categoryId,
      partCategoryName: e.target.value,
    });
  };

  const changeModelHandler = (e) => {
    setSelectedPart({
      ...selectedPart,
      partModel: e.target.value,
    });
  };

  const changeReleasedHandler = (e) => {
    setSelectedPart({
      ...selectedPart,
      partReleased: e.target.value,
    });
  };

  const changeManufacturerHandler = (e) => {
    setSelectedPart({
      ...selectedPart,
      partManufacturer: e.target.value,
    });
  };

  const changeQuantityHandler = (e) => {
    setSelectedPart({
      ...selectedPart,
      partQuantity: e.target.value,
    });
  };

  const onImageChange = (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      setUserImagePreview({
        image: URL.createObjectURL(img),
      });
      setUserImage({ image: img });
    }
  };
  return (
    <Modal
      show={editModal}
      onHide={() => setEditModal(false)}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update item
        </Modal.Title>
        <ModalBody></ModalBody>
      </Modal.Header>
      <Form
        name="partImageUpdate"
        onSubmit={handleSubmit}
        className="bg-light p-4 m-2 rounded shadow-sm border"
      >
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
              value={selectedPart.partManufacturer}
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
              value={selectedPart.partModel}
              onChange={changeModelHandler}
              type="text"
              placeholder="Model"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            sm={12}
            md={12}
            lg={4}
            className="mb-2"
            controlId="formReleased"
          >
            <Form.Label>Released</Form.Label>
            <Form.Control
              required
              value={
                !selectedPart.partReleased
                  ? null
                  : new Date(selectedPart.partReleased)
                      .toISOString()
                      .split("T")[0]
              }
              onChange={changeReleasedHandler}
              type="date"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            sm={12}
            md={12}
            lg={4}
            className="mb-2"
            controlId="formQuantity"
          >
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              value={selectedPart.partQuantity}
              onChange={changeQuantityHandler}
              type="number"
              placeholder="0"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            sm={12}
            md={12}
            lg={4}
            className="mb-2"
            controlId="formCategory"
          >
            <Form.Label>Category</Form.Label>
            <Form.Select
              onChange={changeCategoryHandler}
              aria-label="categorySelect"
              value={selectedPart.partCategoryName}
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
        <Row className="mb-2 d-flex justify-content-evenly">
          {/*Image upload Form.Group*/}
          <Card as={Col} sm={12} md={6} lg={4} className="text-center my-2">
            <Image
              className="d-block mx-auto"
              width={200}
              src={selectedPart.imagePath}
            ></Image>
            <Card.Body>
              <Card.Title>Current image</Card.Title>
            </Card.Body>
          </Card>
          <Card as={Col} sm={12} md={6} lg={4} className="text-center my-2">
            <Image
              className="d-flex mx-auto align-content-center align-items-center"
              width={200}
              src={
                userImagePreview.image !== null
                  ? userImagePreview.image
                  : "https://dummyimage.com/200x200/f8f9fa/000"
              }
            ></Image>
            <Card.Body>
              <Card.Title>New image</Card.Title>
            </Card.Body>
          </Card>
          <Form.Group
            as={Col}
            sm={12}
            md={12}
            lg={12}
            className="mb-2"
            controlId="formFile"
          >
            <Form.Label>Image</Form.Label>
            {userImage.image ? (
              <div className="position-relative mb-2">
                <Button
                  onClick={() => {
                    setUserImage({ image: null });
                    setUserImagePreview({ image: null });
                  }}
                  variant="outline-danger"
                  className="position-absolute bottom-0 end-0"
                >
                  Clear
                </Button>
              </div>
            ) : null}
            <Form.Control
              onChange={onImageChange}
              name="partImageUpdate"
              type="file"
            />
          </Form.Group>
        </Row>
      </Form>
      <Modal.Footer>
        <Button onClick={() => setEditModal(false)}>Close</Button>
        <Button
          onClick={handleSubmit}
          type="submit"
          className="mx-2"
          variant="primary"
        >
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
