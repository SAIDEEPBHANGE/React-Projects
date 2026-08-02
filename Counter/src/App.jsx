import { useState } from "react";
import DigitalClock from "./components/DigitalClock.jsx";

function App() {
  const [count, setCount] = useState(0);

  const AddCounter = () => setCount(count + 1);

  const subtractCounter = () => {
    if (count > 0) setCount(count - 1);
  };

  const resetCounter = () => setCount(0);

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #74ebd5, #ACB6E5)",
      }}
    >
      <div
        className="card shadow-lg border-0 rounded-4 p-4 text-center"
        style={{ width: "420px" }}
      >
        <h2 className="fw-bold text-dark mb-3">Counter App</h2>

        {/* Digital Clock */}
        <div
          className="bg-dark text-success rounded-3 py-3 mb-4 shadow"
          style={{
            fontSize: "2rem",
            fontFamily: "monospace",
            letterSpacing: "2px",
          }}
        >
          <DigitalClock />
        </div>

        {/* Counter Circle */}
        <div
          className="mx-auto mb-4 d-flex justify-content-center align-items-center rounded-pill bg-primary text-white shadow"
          style={{
            width: "130px",
            height: "130px",
            fontSize: "3rem",
            fontWeight: "bold",
          }}
        >
          {count}
        </div>

        {/* Buttons */}
        <div className="d-flex justify-content-center gap-3 mb-4">
          <button
            className="btn btn-success btn-lg rounded-circle"
            style={{ width: 60, height: 60 }}
            onClick={AddCounter}
          >
            +
          </button>

          <button
            className="btn btn-danger btn-lg rounded-circle"
            style={{ width: 60, height: 60 }}
            onClick={subtractCounter}
            disabled={count === 0}
          >
            −
          </button>

          <button
            className="btn btn-warning btn-lg rounded-circle"
            style={{ width: 60, height: 60 }}
            onClick={resetCounter}
          >
            ↺
          </button>
        </div>

        {/* Progress */}
        <div className="progress mb-3" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: `${Math.min(count * 10, 100)}%` }}
          ></div>
        </div>

        {/* Status */}
        {count >= 10 ? (
          <div className="alert alert-success mb-0">
            🎉 Congratulations! You reached <strong>10</strong>.
          </div>
        ) : (
          <p className="text-muted mb-0">
            Keep clicking to reach <strong>10</strong>.
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
