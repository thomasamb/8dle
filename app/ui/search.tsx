import GameState from "../lib/gameState";
import { useActionState, useState } from "react";
import GameHandler from "../lib/gameHandler";
import { Button, Dropdown, Form, InputGroup } from "react-bootstrap";
import { answerSet } from "../lib/answerSet";
import { SlArrowRightCircle } from "react-icons/sl";

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
  const [inputError, setInputError] = useState(false);

  function validateInput(input: string): boolean {
    return answerSet.has(input);
  }

  const filtered = Array.from(answerSet).filter((name) =>
    name.toLowerCase().includes(input.toLowerCase()),
  );

  const [_, formAction, isPending] = useActionState(
    async (previousState: GameState, formData: FormData) => {
      const guess = formData.get("guess") as string;
      if (!validateInput(guess)) {
        setInputError(true);
        return previousState;
      } else {
        const result: GameState = await gameHandler.submitGuess(guess);
        setGameState(result);
        setInputError(false);
        setInput("");
        return result;
      }
    },
    gameState,
  );

  return (
    <div id="searchContainer">
      <form action={formAction}>
        <Dropdown show={showDropdown && input.length > 0} drop="up">
          <InputGroup className="mb-3">
            <Form.Control
              disabled={gameState.won || gameState.lost || isPending}
              type="text"
              name="guess"
              value={input}
              isInvalid={inputError}
              onChange={(e) => {
                setInput(e.target.value);
                setShowDropdown(true);
              }}
              onBlur={() => setShowDropdown(false)}
              placeholder="Guess a track..."
              autoComplete="off"
            />
            <Button
              disabled={gameState.won || gameState.lost || isPending}
              id="guessButton"
              type="submit"
            >
              <SlArrowRightCircle id="guessButtonIcon" />
            </Button>
            {inputError && (
              <Form.Control.Feedback type="invalid">
                Please select a valid track name.
              </Form.Control.Feedback>
            )}
          </InputGroup>
          <Dropdown.Menu
            flip
            popperConfig={{
              modifiers: [
                {
                  name: "preventOverflow",
                  options: {
                    boundary: "viewport",
                  },
                },
              ],
            }}
          >
            {filtered.map((name) => (
              <Dropdown.Item
                key={name}
                onMouseDown={() => {
                  setInput(name);
                  setShowDropdown(false);
                }}
              >
                {name}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </form>
    </div>
  );
}
