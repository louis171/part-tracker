import React from "react";
import { useState } from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Col from "react-bootstrap/Col";

const baseURL = "http://localhost:4000/api";

const ImageForm = () => {
  const [userImage, setUserImage] = useState({ image: null });

  const handleSubmit = (event) => {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", event.target.files[0]);
    console.log(userImage);
    const requestOptions = {
      method: "POST",
      body: formData,
    };
    fetch(`${baseURL}/upload`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img)
      console.log(URL.createObjectURL(img));
      setUserImage({
        image: URL.createObjectURL(img),
      });
      event.preventDefault();
      const formData = new FormData();
      formData.append("partImageUpload", img);
      formData.append('name', 'Test Name');
      formData.append('desc', 'Test description');
    console.log(formData);
    const requestOptions = {
      method: "POST",
      body: formData
    };
    fetch(`${baseURL}/upload2`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log(data));
    }
  };

  return (
    <Form name="partImageUpload" onSubmit={handleSubmit}>
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
            <img className="border w-50 h-25" src={userImage.image} />
            <Button
              onClick={() => setUserImage({ image: null })}
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
      <Button type="submit ">Submit</Button>
    </Form>
  );
};

export default ImageForm;
