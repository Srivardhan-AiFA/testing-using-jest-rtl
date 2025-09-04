import React, { useState } from "react";

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 data-testid="counter">Count {count}</h1>
      <div className="buttons">
        <button
          style={{ cursor: "pointer", margin: "0px 10px", padding: "10px" }}
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Increment
        </button>
        <button
          style={{ cursor: "pointer", margin: "0px 10px", padding: "10px" }}
          onClick={() => {
            setCount(count - 1);
          }}
        >
          Decrement
        </button>
        <button
          style={{ cursor: "pointer", margin: "0px 10px", padding: "10px" }}
          onClick={() => {
            setCount(0);
          }}
        >
          Set to ZERO
        </button>
        <button
          style={{ cursor: "pointer", margin: "0px 10px", padding: "10px" }}
          onClick={() => {
            setCount(count * -1);
          }}
        >
          Reverse Sign
        </button>
      </div>
    </>
  );
}
