import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Main from "./components/Main/Main";
import "./app.css";
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Main />
    </div>
  );
};

export default App;
