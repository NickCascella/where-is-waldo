import { useEffect } from "react";

const GameOver = (props) => {
  const highScore = props.highScore;
  const setHighScore = props.setHighScore;
  const currentScore = props.currentScore;

  const highScores = [...highScore];
  const finalScore = { ...currentScore };

  const organizedHighScores = highScores.sort((a, b) => {
    return a.score - b.score;
  });

  const tempTopFiveHighscores = [];
  let topFiveHighscores = [];

  for (let i = 0; i < 5; i++) {
    tempTopFiveHighscores.push(organizedHighScores[i]);
    if (tempTopFiveHighscores.length === 5) {
      topFiveHighscores = tempTopFiveHighscores;
    }
  }

  const displayedHighScores = () => {
    return (
      <div>
        {topFiveHighscores.map((scoreData) => {
          if (scoreData !== undefined) {
            return (
              <div className="gameOverScreenIndividualHighscores">
                <span>Name: {scoreData.name}</span>
                <span>Time: {scoreData.displayedTime}</span>
              </div>
            );
          }
        })}
      </div>
    );
  };

  return (
    <div className="gameOverScreenOuter">
      <div className="gameOverScreenInner">
        <div id="gameOverScreenLeftSide">
          <span style={{ marginBottom: "2%" }}>Top 5 Time's</span>
          <div>{topFiveHighscores && displayedHighScores()}</div>
        </div>
        <div id="gameOverScreenRightSide">
          <div style={{ marginBottom: "5%" }}>Let's see how you did..</div>
          <span> Name: {finalScore.name} </span>
          <span> Time: {finalScore.displayedTime} </span>
        </div>
      </div>
    </div>
  );
};

export default GameOver;
