import { useState } from "react";
import { CGrid } from "../components/c-grid";

export function Home() {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const validateInput = (value: string): boolean => {
    if (value === "") {
      setError("Please enter a number");
      return false;
    }

    if (!/^\d+$/.test(value)) {
      setError("Please enter a valid number");
      return false;
    }

    const num = parseInt(value);

    if (num < 5 || num > 25) {
      setError("Number must be between 5 and 25");
      return false;
    }

    setError("");
    return true;
  };

  return (
    <main className="app-container">
      <form>
        <label htmlFor="grid-size">Grid Size (5-25):</label>
        <input
          id="grid-size"
          value={input}
          onChange={(e) => {
            const value = e.target.value;
            setInput(value);
            validateInput(value);
          }}
          type="text"
          placeholder="Enter number"
        />
        {error && <div className="error-message">{error}</div>}
      </form>

      {!error && input && <CGrid n={+input} />}
    </main>
  );
}
