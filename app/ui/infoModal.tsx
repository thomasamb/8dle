import { ReactNode } from "react";
import { Modal } from "react-bootstrap";

export default function InfoModal({
  showModal,
  onHide,
}: {
  showModal: boolean;
  onHide: () => void;
}): ReactNode {
  return (
    <div id="infoContainer">
      <Modal
        dialogClassName="infoModalDialog"
        show={showModal}
        onHide={onHide}
      >
        <Modal.Header closeButton>
          <h1>8dle</h1>
        </Modal.Header>
        <Modal.Body>
          <p>Welcome to 8dle, a guessing game where you guess the track from Mario Kart 8 Deluxe!</p>
          <p>To make a guess, click/tap the search bar at the bottom and start typing in a guess, selecting a track from the search results that pop up.</p>
          <p>You will have 5 guesses to try and guess the track.</p>
          <p>Clues by Round: </p>
          <p>1. Track Layout</p>
          <p>2. The console the track <i>originally</i> premiered on</p>
          <p>3. The Grand Prix the track is featured in</p>
          <p>4. A 30 second snippet of the main track theme</p>
          <p>5. A screenshot from gameplay of the track.</p>
          <p>To view your stats, click/tap the stats icon in the top right.</p>
          <p>You can also reset your stats in the stats view.</p>
          <p>The game resets every midnight Eastern Standard Time.</p>
        </Modal.Body>
      </Modal>
    </div>
  );
}
