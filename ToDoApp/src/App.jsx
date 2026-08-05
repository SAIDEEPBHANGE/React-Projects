import { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Body from "./components/Body";

function App() {
  return (
    <div className="row justify-content-center">
      <div className="col-12">
        <div className="card shadow border-0 rounded-4">
          {/* Header */}
          <Header />
          {/* Body */}
          <Body />
          {/* Footer */}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
