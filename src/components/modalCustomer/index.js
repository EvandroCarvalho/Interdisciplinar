import React, { Component } from 'react'
import { Modal, Button } from 'react-bootstrap'

export default class ModalCustomer extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <>
        <Modal show={this.props.showModal}>
          <Modal.Header>
            <Modal.Title>{this.props.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{this.props.bodyMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.props.closeModal()}>
              Ok
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }
}
