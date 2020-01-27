import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Modals = props => {
  const { className, toggle, isOpen, header, func, btnLabel, size } = props;

  return (
    <div>
      <Modal size={size} isOpen={isOpen} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>{header}</ModalHeader>
        <ModalBody>{props.children}</ModalBody>
        <ModalFooter>
          <Button color="success" onClick={func}>
            {btnLabel}
          </Button>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Modals;
