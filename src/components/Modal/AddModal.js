import React, { useState } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import { baseURL } from "../../API/baseUrl";

const EditModal = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const [userManufacturer, setUserManufacturer] = useState("");
  const [userModel, setUserModel] = useState("");
  const [userReleased, setUserReleased] = useState("");
  const [userQuantity, setUserQuantity] = useState(1);
  const [userCategory, setUserCategory] = useState("");
  const [userImage, setUserImage] = useState({ image: null });

  // State for image preview. Stored as URL.createObjectURL
  const [userImagePreview, setUserImagePreview] = useState({ image: null });

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    const releaseDateTime = new Date(userReleased).toISOString();
    formData.append("partImageUpload", userImage.image);
    formData.append("partManufacturer", userManufacturer);
    formData.append("partModel", userModel);
    formData.append("partReleased", releaseDateTime);
    formData.append("partQuantity", userQuantity);
    formData.append("partCategoryId", userCategory);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch(`${baseURL}${props.urlTarget}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data))
      .then(setModalShow(false))
      .then(clearFormDataHandler)
      .then(props.refreshDataHandler);
  };

  const clearFormDataHandler = () => {
    setUserManufacturer("");
    setUserModel("");
    setUserReleased("");
    setUserQuantity(1);
    setUserCategory("");
    setUserImage({ image: null });
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

  const changeReleasedHandler = (e) => {
    setUserReleased(e.target.value);
  };

  const changeManufacturerHandler = (e) => {
    setUserManufacturer(e.target.value);
  };

  const changeQuantityHandler = (e) => {
    setUserQuantity(e.target.value);
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
    <>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        {modalShow ? "Cancel" : "Add"}
      </Button>

      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add new item
          </Modal.Title>
        </Modal.Header>
        <Form
          name="partImageUpload"
          onSubmit={handleSubmit}
          className="bg-light p-4 m-2 rounded shadow-sm border"
        >
          <Row className="mb-2">
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={4}
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
              lg={4}
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
                value={userReleased}
                onChange={changeReleasedHandler}
                type="date"
              />
            </Form.Group>
          </Row>
          <Row className="mb-2">
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
              lg={4}
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

            {/*Image upload Form.Group*/}
            <Form.Group
              as={Col}
              sm={12}
              md={12}
              lg={4}
              className="mb-2"
              controlId="formFile"
            >
              <Form.Label>Image</Form.Label>
              {userImage.image ? (
                <div className="position-relative mb-2">
                  <img
                    className="border w-50 h-25"
                    src={userImagePreview.image}
                  />
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
                name="partImageUpload"
                type="file"
              />
            </Form.Group>
          </Row>
        </Form>
        <Modal.Footer>
          <Button onClick={() => setModalShow(false)}>Close</Button>
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
    </>
  );
};

export default EditModal;
