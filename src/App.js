import { useContext, useState } from "react";
import "./App.css";
import GameBoard from "./components/gameBoard";
import GameOver from "./components/gameOver";
import GameStart from "./components/gameStartScreen";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(true);
  const [currentScore, setCurrentScore] = useState({
    name: "",
    score: 0,
    displayedTime: "",
  });
  const [highScore, setHighScore] = useState([]);

  return (
    <div className="App">
      {gameStart && (
        <GameStart
          gameStart={gameStart}
          setGameStart={setGameStart}
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
        ></GameStart>
      )}
      <GameBoard
        gameOver={gameOver}
        setGameOver={setGameOver}
        gameStart={gameStart}
        setGameStart={setGameStart}
        highScore={highScore}
        setHighScore={setHighScore}
        currentScore={currentScore}
        setCurrentScore={setCurrentScore}
      ></GameBoard>
      {gameOver && (
        <GameOver
          highScore={highScore}
          setHighScore={setHighScore}
          currentScore={currentScore}
        ></GameOver>
      )}
    </div>
  );
}

export default App;
