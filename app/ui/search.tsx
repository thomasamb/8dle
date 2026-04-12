import GameState from "../lib/gameState";
import { useActionState, useState } from "react";
import GameHandler from "../lib/gameHandler";
import { Button, Dropdown, Form } from "react-bootstrap";
import { answerSet } from "../lib/answerSet";

export default function Search({
  gameState,
  setGameState,
  gameHandler,
}: {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  gameHandler: GameHandler;
}) {
  const [input, setInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filtered = answerSet.filter((answer) =>
    answer.trackName.toLowerCase().includes(input.toLowerCase()),
  );

  const [state, formAction] = useActionState(
    (previousState: GameState, formData: FormData) => {
      const guess = formData.get("guess") as string;
      const result: GameState = gameHandler.submitGuess(guess);
      setGameState(result);
      setInput("");
      return result;
    },
    gameState,
  );

  return (
    <>
      <form action={formAction}>
        <Dropdown show={showDropdown && input.length > 0}>
          <Form.Control
            type="text"
            name="guess"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowDropdown(true);
            }}
            onBlur={() => setShowDropdown(false)}
            placeholder="Guess a track..."
            autoComplete="off"
          />
          <Dropdown.Menu>
            {filtered.map((answer) => (
              <Dropdown.Item
                key={answer.trackName}
                onMouseDown={() => {
                  setInput(answer.trackName);
                  setShowDropdown(false);
                }}
              >
                {answer.trackName}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <Button variant="primary" type="submit">
          Guess
        </Button>
      </form>
    </>
  );
}
