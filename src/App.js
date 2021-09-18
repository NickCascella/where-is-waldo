import { onSnapshot, collection } from "@firebase/firestore";
import { useEffect, useState } from "react";
import "./App.css";
import GameBoard from "./components/gameBoard";
import GameOver from "./components/gameOver";
import GameStart from "./components/gameStartScreen";
import db from "./firebase";

function App() {
  const [gameOver, setGameOver] = useState(false);
  const [gameStart, setGameStart] = useState(true);
  const [currentScore, setCurrentScore] = useState({
    name: "",
    score: 0,
    displayedTime: "",
  });
  const [highScore, setHighScore] = useState([]);
  const [characterLocations, setCharacterLocations] = useState([]);

  useEffect(() => {
    onSnapshot(collection(db, "missingCharacters"), (snapshot) => {
      setCharacterLocations(snapshot.docs.map((doc) => doc.data()));
    });
    onSnapshot(collection(db, "highscores"), (snapshot) => {
      const currentHighscores = snapshot.docs.map((doc) => doc.data());
      setHighScore(currentHighscores);
    });
  }, []);

  return (
    <div className="App">
      {gameStart && (
        <GameStart
          setGameStart={setGameStart}
          currentScore={currentScore}
          setCurrentScore={setCurrentScore}
        ></GameStart>
      )}
      <GameBoard
        gameOver={gameOver}
        setGameOver={setGameOver}
        gameStart={gameStart}
        characterLocations={characterLocations}
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
