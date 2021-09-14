import React, { useEffect } from "react";
import { useState } from "react";
import characterBkg from "../images/characterBackground.JPG";
import zoidbergPhoto from "../images/zoidberg.JPG";
import saitamaPhoto from "../images/saitama.JPG";
import phineasPhoto from "../images/phineas.JPG";

const GameBoard = () => {
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
  }, []);

  useEffect(() => {
    targetPositions.gameOver();
  }, [characterStatus]);

  const timer = () => {
    //Fix copy ...time issue
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
  };

  const timeTracker = {
    seconds: 0,
    miniutes: 0,
    hours: 0,
    startTimer: () => {
      setInterval(timer, 1000);
    },
    stopTimer: () => {
      clearInterval(timer);
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
    guess: (e) => {
      const selection = e.target.innerText;
      const zoidberg = targetPositions.zoidberg;
      const phineas = targetPositions.phineas;
      const saitama = targetPositions.saitama;
      if (
        selection === zoidberg.name &&
        mouseGuessTarget[0] > zoidberg.minX &&
        mouseGuessTarget[0] < zoidberg.maxX &&
        mouseGuessTarget[1] > zoidberg.minY &&
        mouseGuessTarget[1] < zoidberg.maxY
      ) {
        setCharacterStauts({ ...characterStatus, zoidbergStatus: "Found" });
        document.getElementById("characterZoidbergStatus").style.color =
          "Green";
      } else if (
        selection === phineas.name &&
        mouseGuessTarget[0] > phineas.minX &&
        mouseGuessTarget[0] < phineas.maxX &&
        mouseGuessTarget[1] > phineas.minY &&
        mouseGuessTarget[1] < phineas.maxY
      ) {
        setCharacterStauts({ ...characterStatus, phineasStatus: "Found" });
        document.getElementById("characterPhineasStatus").style.color = "Green";
      } else if (
        selection === saitama.name &&
        mouseGuessTarget[0] > saitama.minX &&
        mouseGuessTarget[0] < saitama.maxX &&
        mouseGuessTarget[1] > saitama.minY &&
        mouseGuessTarget[1] < saitama.maxY
      ) {
        setCharacterStauts({ ...characterStatus, saitamaStatus: "Found" });
        document.getElementById("characterSaitamaStatus").style.color = "Green";
      } else {
      }
    },
    gameOver: () => {
      if (
        characterStatus.zoidbergStatus === "Found" &&
        characterStatus.phineasStatus === "Found" &&
        characterStatus.saitamaStatus === "Found"
      ) {
        console.log("hi");
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
              class="gameBoardTrackingCharactersPhoto"
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
              class="gameBoardTrackingCharactersPhoto"
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
              class="gameBoardTrackingCharactersPhoto"
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
          onClick={(e) => {
            targetPositions.guess(e);
          }}
        >
          <div className="popupItem">Phineas</div>
          <div className="popupItem">Zoidberg</div>
          <div className="popupItem">Saitama</div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
