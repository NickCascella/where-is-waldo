import React, { useEffect } from "react";
import { useState } from "react";
import characterBkg from "../images/characterBackground.JPG";
import zoidbergPhoto from "../images/zoidberg.JPG";
import saitamaPhoto from "../images/saitama.JPG";
import phineasPhoto from "../images/phineas.JPG";
import GameOver from "./gameOver";

//Timer

const GameBoard = (props) => {
  //states
  const gameStartMenu = props.gameStart;
  const setGameStart = props.setGameStart;
  const gameOver = props.gameOver;
  const setGameOver = props.setGameOver;
  const highScore = props.highScore;
  const setHighScore = props.setHighScore;

  const [time, setTime] = useState({
    seconds: 0,
    miniutes: 0,
    hours: 0,
  });
  const [menuDropdownPosition, setMenuDropdownPosition] = useState([0, 0]);
  const [mouseGuessTarget, setMouseGuessTarget] = useState([0, 0]);
  const [characterStatus, setCharacterStauts] = useState({
    zoidbergStatus: "Missing",
    phineasStatus: "Missing",
    saitamaStatus: "Missing",
  });
  const [score, setScore] = useState([]);

  useEffect(() => {
    timeTracker.startTimer();
  }, [gameStartMenu]);

  useEffect(() => {
    targetPositions.gameOver();
  }, [characterStatus]);

  const timer = () => {
    if (gameStartMenu === false && gameOver === false) {
      if (timeTracker.seconds < 59) {
        timeTracker.seconds += 1;
      } else if (timeTracker.miniutes < 59) {
        timeTracker.seconds = 0;
        timeTracker.miniutes += 1;
      } else if (timeTracker.hours < 59) {
        timeTracker.seconds = 0;
        timeTracker.miniutes = 0;
        timeTracker.hours += 1;
      }
      setTime({
        seconds: timeTracker.seconds,
        miniutes: timeTracker.miniutes,
        hours: timeTracker.hours,
      });
    }
  };

  const timeTracker = {
    timesUp: false,
    seconds: 0,
    miniutes: 0,
    hours: 0,
    startTimer: () => {
      setInterval(() => {
        timer();
      }, 1000);
    },
    stopTimer: () => {
      clearInterval();
    },
    formatTime: (time) => {
      const result = time < 10 ? `0${time}` : time;
      return result;
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
    confirmTarget: (e) => {},
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
            setCharacterStauts({ ...characterStatus, zoidbergStatus: "Found" });
            break;
          case targetPositions.phineas:
            setCharacterStauts({ ...characterStatus, phineasStatus: "Found" });
            break;
          case targetPositions.saitama:
            setCharacterStauts({ ...characterStatus, saitamaStatus: "Found" });
        }
        document.getElementById(statusColor).style.color = "Green";
      }
    },
    gameOver: () => {
      if (
        characterStatus.zoidbergStatus === "Found" &&
        characterStatus.phineasStatus === "Found" &&
        characterStatus.saitamaStatus === "Found"
      ) {
        setGameOver(true);
        // const updatedHighScore = [...highScore];
        // updatedHighScore.push({ name: "", score: 0 });
        // setHighScore([...highScore]);
        timeTracker.stopTimer();
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
                className="gameBoardTrackingCharacterStatus"
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
                className="gameBoardTrackingCharacterStatus"
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
                className="gameBoardTrackingCharacterStatus"
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
          {timeTracker.formatTime(time.hours)}:{" "}
          {timeTracker.formatTime(time.miniutes)} :{" "}
          {timeTracker.formatTime(time.seconds)}
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
