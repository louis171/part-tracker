import React from 'react';
import Container from "react-bootstrap/Container";
import NavBar from "../Nav/NavBar";

const Layout = (props) => {
  return (
    <>
      <NavBar />
      <Container fluid="md" >{props.children}</Container>
    </>
  );
};

export default Layout;