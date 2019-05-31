import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

export default class ModalCustomer extends Component {
  render() {
    return (
      <Modal.Dialog style={{ width: "100%" }}>
        <Modal.Header>
          <Modal.Title>{this.props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.bodyMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => this.props.closeModal()}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
