import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

export default function InfoModal(
  showModal: boolean,
  onHide: () => void,
): ReactNode {
  return (
    <div id="infoContainer">
      <Modal
        dialogClassName="infoModalDialog"
        id="infoModal"
        show={showModal}
        onHide={onHide}
      ></Modal>
    </div>
  );
}
