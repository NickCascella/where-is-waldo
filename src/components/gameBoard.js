import React, { useEffect } from "react";
import { useState } from "react";
import characterBkg from "../images/characterBackground.JPG";
import zoidbergPhoto from "../images/zoidberg.JPG";
import saitamaPhoto from "../images/saitama.JPG";
import phineasPhoto from "../images/phineas.JPG";

const GameBoard = (props) => {
  //states
  const gameStartMenu = props.gameStart;
  const gameOver = props.gameOver;
  const setGameOver = props.setGameOver;
  const highScore = props.highScore;
  const setHighScore = props.setHighScore;
  const currentScore = props.currentScore;
  const setCurrentScore = props.setCurrentScore;
  const [seconds, setSeconds] = useState(0);
  const [menuDropdownPosition, setMenuDropdownPosition] = useState([0, 0]);
  const [mouseGuessTarget, setMouseGuessTarget] = useState([0, 0]);
  const [characterStatus, setCharacterStauts] = useState({
    zoidbergStatus: "Missing",
    zoidberStatusColor: "Red",
    phineasStatus: "Missing",
    phineasStatusColor: "Red",
    saitamaStatus: "Missing",
    saitamaStatusColor: "Red",
  });

  useEffect(() => {
    setTimeout(timer, 1000);
  }, [gameStartMenu, seconds]);

  useEffect(() => {
    targetPositions.gameOver();
  }, [characterStatus]);

  const timer = () => {
    if (gameStartMenu === false && gameOver === false) {
      setSeconds(seconds + 1);
    }
  };

  const timeTracker = {
    formatTime: (time) => {
      const result = time < 10 ? `0${time}` : `${time}`;
      return result;
    },
    formatSeconds: () => {
      return gameOver !== true ? seconds % 60 : (seconds % 60) - 1;
    },
    formatMinutes: () => {
      return Math.floor(seconds / 60);
    },
    formatHours: () => {
      return Math.floor(seconds / 3600);
    },
  };

  const popupWindow = {
    popup: document.getElementById("popupWindow"),
    generatePopup: (e) => {
      const mouseGuessX = e.nativeEvent.offsetX;
      const mouseGuessY = e.nativeEvent.offsetY;
      const targetCoardinates = [mouseGuessX, mouseGuessY];
      setMouseGuessTarget(targetCoardinates);
      const mouseDropDownX = e.pageX;
      const mouseDropDownY = e.pageY;
      const menuPlacement = [mouseDropDownX, mouseDropDownY];
      setMenuDropdownPosition(menuPlacement);
    },
    removePopup: (e) => {
      const clicked =
        e.target.id !== "gameBoardTargets"
          ? (popupWindow.popup.style.display = "none")
          : (popupWindow.popup.style.display = "block");
      return clicked;
    },
  };

  const targetPositions = {
    guess: (character, statusColor) => {
      if (
        mouseGuessTarget[0] > character.minX &&
        mouseGuessTarget[0] < character.maxX &&
        mouseGuessTarget[1] > character.minY &&
        mouseGuessTarget[1] < character.maxY
      ) {
        switch (character) {
          case targetPositions.zoidberg:
            setCharacterStauts({
              ...characterStatus,
              zoidbergStatus: "Found",
              zoidberStatusColor: "Green",
            });
            break;
          case targetPositions.phineas:
            setCharacterStauts({
              ...characterStatus,
              phineasStatus: "Found",
              phineasStatusColor: "Green",
            });
            break;
          case targetPositions.saitama:
            setCharacterStauts({
              ...characterStatus,
              saitamaStatus: "Found",
              saitamaStatusColor: "Green",
            });
        }
      }
    },
    gameOver: () => {
      if (
        characterStatus.zoidbergStatus === "Found" &&
        characterStatus.phineasStatus === "Found" &&
        characterStatus.saitamaStatus === "Found"
      ) {
        const displayedTime = {
          seconds: timeTracker.formatTime(timeTracker.formatSeconds()),
          miniutes: timeTracker.formatTime(timeTracker.formatMinutes()),
          hours: timeTracker.formatTime(timeTracker.formatHours()),
        };
        const finalScore = {
          name: currentScore.name,
          score: seconds,
          displayedTime: `${displayedTime.hours} : ${displayedTime.miniutes} : ${displayedTime.seconds}`,
        };
        setCurrentScore({
          ...currentScore,
          score: finalScore.score,
          displayedTime: finalScore.displayedTime,
        });
        setHighScore(highScore.concat(finalScore));
        setGameOver(true);
      }
    },

    phineas: {
      name: "Phineas",
      minX: 1590,
      maxX: 1650,
      minY: 5375,
      maxY: 5460,
    },
    zoidberg: {
      name: "Zoidberg",
      minX: 1230,
      maxX: 1520,
      minY: 5900,
      maxY: 6200,
    },
    saitama: {
      name: "Saitama",
      minX: 500,
      maxX: 580,
      minY: 5580,
      maxY: 5660,
    },
  };

  return (
    <div
      id="gameBoardScreen"
      onClick={(e) => {
        popupWindow.removePopup(e);
      }}
    >
      <div id="gameBoardTrackingDisplay">
        <div id="gameBoardTrackingCharacters">
          <div className="gameBoardTrackingCharactersSpecific">
            <div>
              Zoidberg{" "}
              <div
                id="characterZoidbergStatus"
                style={{ color: characterStatus.zoidberStatusColor }}
              >
                {characterStatus.zoidbergStatus}
              </div>
            </div>
            <img
              className="gameBoardTrackingCharactersPhoto"
              src={zoidbergPhoto}
            ></img>{" "}
          </div>
          <div className="gameBoardTrackingCharactersSpecific">
            <div>
              Phineas{" "}
              <div
                id="characterPhineasStatus"
                style={{ color: characterStatus.phineasStatusColor }}
              >
                {characterStatus.phineasStatus}
              </div>
            </div>
            <img
              className="gameBoardTrackingCharactersPhoto"
              src={phineasPhoto}
            ></img>{" "}
          </div>
          <div className="gameBoardTrackingCharactersSpecific">
            <div>
              Saitama
              <div
                id="characterSaitamaStatus"
                style={{ color: characterStatus.saitamaStatusColor }}
              >
                {characterStatus.saitamaStatus}
              </div>
            </div>
            <img
              className="gameBoardTrackingCharactersPhoto"
              src={saitamaPhoto}
            ></img>{" "}
          </div>
        </div>
        <div id="gameBoardTrackingTime">
          {timeTracker.formatTime(timeTracker.formatHours())} :{" "}
          {timeTracker.formatTime(timeTracker.formatMinutes())} :{" "}
          {timeTracker.formatTime(timeTracker.formatSeconds())}
        </div>
      </div>
      <div>
        <img
          onClick={(e) => {
            popupWindow.generatePopup(e);
          }}
          id="gameBoardTargets"
          src={characterBkg}
        ></img>
        <div
          id="popupWindow"
          style={{
            top: `${menuDropdownPosition[1]}px`,
            left: `${menuDropdownPosition[0]}px`,
            display: "none",
          }}
        >
          <div
            onClick={() => {
              targetPositions.guess(
                targetPositions.zoidberg,
                "characterZoidbergStatus"
              );
            }}
            className="popupItem"
          >
            Zoidberg
          </div>
          <div
            onClick={() => {
              targetPositions.guess(
                targetPositions.phineas,
                "characterPhineasStatus"
              );
            }}
            className="popupItem"
          >
            Phineas
          </div>
          <div
            onClick={() => {
              targetPositions.guess(
                targetPositions.saitama,
                "characterSaitamaStatus"
              );
            }}
            className="popupItem"
          >
            Saitama
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
