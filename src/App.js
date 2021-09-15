import { useState } from "react";
import "./App.css";
import GameBoard from "./components/gameBoard";
import GameOver from "./components/gameOver";

function App() {
  return (
    <div className="App">
      <GameBoard></GameBoard>
    </div>
  );
}

export default App;
