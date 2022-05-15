import React from "react";
import Spinner from "react-bootstrap/Spinner";

const Loading = () => {
  return (
    <main className="position-fixed d-flex w-100 h-100 justify-content-center align-items-center m-0 p-0 bg-light">
      <div className="text-center">
        <h1 style={{ letterSpacing: ".5rem" }} className="display-1">Part Tracker</h1>
        <Spinner
          className="mt-4"
          variant="primary"
          animation="grow"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Spinner
          className="mt-4"
          variant="primary"
          animation="grow"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <Spinner
          className="mt-4"
          variant="primary"
          animation="grow"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </main>
  );
};

export default Loading;
