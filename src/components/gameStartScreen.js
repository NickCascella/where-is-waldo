import zoidbergPhoto from "../images/zoidberg.JPG";
import saitamaPhoto from "../images/saitama.JPG";
import phineasPhoto from "../images/phineas.JPG";

const GameStart = (props) => {
  const gameStart = props.gameStart;
  const setGameStart = props.setGameStart;
  const currentScore = props.currentScore;
  const setCurrentScore = props.setCurrentScore;

  const startGame = (e) => {
    e.preventDefault();
    setGameStart(false);
  };

  const setName = (e) => {
    const name = e.target.value;
    name.toString();
    setCurrentScore({ ...currentScore, name: name });
  };

  return (
    <div className="gameOverScreenOuter">
      <div className="gameOverScreenInner">
        <div className="gameStartScreenLeftSide">
          <div>
            Welcome to{" "}
            <b>
              {" "}
              <i>Spot Me</i>
            </b>
          </div>
          <div>
            Find all the following characters as quick as you can to get the
            best time possible. Just enter your initals and click start to
            begin!
          </div>
          <form
            id="gameStartScreenForm"
            onSubmit={(e) => {
              startGame(e);
            }}
          >
            <input
              required
              type="text"
              minLength="3"
              maxLength="3"
              value={currentScore.name}
              onChange={(e) => {
                setName(e);
              }}
            ></input>
            <button id="gameStartScreenButton" type="submit">
              START
            </button>
          </form>
        </div>
        <div className="gameStartScreenRightSide">
          <div className="gameStartCharactersDisplayItem">
            <div className="gameStartCharactersDisplayText">
              Zoidberg <div id="gameStartDifficultyEasy">Easy</div>
            </div>
            <img
              className="gameStartCharactersDisplayPhoto"
              src={zoidbergPhoto}
            ></img>
          </div>
          <div className="gameStartCharactersDisplayItem">
            <div className="gameStartCharactersDisplayText">
              Phinieas <div id="gameStartDifficultyMedium">Medium</div>
            </div>
            <img
              className="gameStartCharactersDisplayPhoto"
              src={phineasPhoto}
            ></img>
          </div>
          <div className="gameStartCharactersDisplayItem">
            <div className="gameStartCharactersDisplayText">
              Saitama <div id="gameStartDifficultyHard">Hard</div>
            </div>
            <img
              className="gameStartCharactersDisplayPhoto"
              src={saitamaPhoto}
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameStart;
