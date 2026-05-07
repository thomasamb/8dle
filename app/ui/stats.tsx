import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

export default function StatsModal({
  showModal,
  onHide,
}: {
  showModal: boolean;
  onHide: () => void;
}): ReactNode {
  return (
    <div id="statsContainer">
      <Modal
        dialogClassName="statsModalDialog"
        id="statsModal"
        show={showModal}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <p>Hello</p>
        </Modal.Header>
        <Modal.Body>
          <p>Hi</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
