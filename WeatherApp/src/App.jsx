import { useState } from "react";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
function App() {
  return (
    <div className="row g-4 justify-content-center">
      <LeftColumn />
      <RightColumn />
    </div>
  );
}

export default App;
