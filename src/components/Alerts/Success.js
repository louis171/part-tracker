import React, { useContext } from "react";
import Modal from "react-bootstrap/Modal";
import Alert from "react-bootstrap/Alert";
import { AlertContext } from '../../Context/alertContext';

const Success = (props) => {
    const { alertShow } = useContext(AlertContext);

  return (
    <Modal size="sm" className="m-0" show={alertShow}>
      <Alert className="m-0 text-center" variant="success">
        Success!
      </Alert>
    </Modal>
  );
};

export default Success;
