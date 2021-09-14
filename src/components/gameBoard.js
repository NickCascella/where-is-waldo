import React, { useEffect } from "react";
import { useState } from "react";
import pokemonBkg from "../images/waldoPokemonBackground.JPG";

const GameBoard = () => {
  const [seconds, setSeconds] = useState(0);
  const [miniutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [time, setTime] = useState([]);
  const [menuDropdownPosition, setMenuDropdownPosition] = useState([0, 0]);
  const [mouseGuessTarget, setMouseGuessTarget] = useState([0, 0]);
  const [score, setScore] = useState([]);

  useEffect(() => {
    timeTracker.startTimer();
  }, []);

  const timer = () => {
    if (timeTracker.seconds < 59) {
      timeTracker.seconds += 1;
      setSeconds(timeTracker.seconds);
      timeTracker.stopTimer();
    } else if (timeTracker.miniutes < 59) {
      timeTracker.miniutes += 1;
      setMinutes(timeTracker.miniutes);
      timeTracker.seconds = 0;
      setSeconds(timeTracker.seconds);
    } else if (timeTracker.hours < 59) {
      timeTracker.hours += 1;
      setHours(timeTracker.hours);
      timeTracker.seconds = 0;
      timeTracker.miniutes = 0;
      setSeconds(timeTracker.seconds);
      setMinutes(timeTracker.miniutes);
    }
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
      const groudon = targetPositions.groudon;
      if (
        selection === groudon.name &&
        mouseGuessTarget[0] > groudon.minX &&
        mouseGuessTarget[0] < groudon.maxX &&
        mouseGuessTarget[1] > groudon.minY &&
        mouseGuessTarget[1] < groudon.maxY
      ) {
        const answer = `${timeTracker.formatTime(
          hours
        )} : ${timeTracker.formatTime(miniutes)} : ${timeTracker.formatTime(
          seconds
        )}`;
        setScore(answer);
      }
    },
    groudon: {
      name: "Groudon",
      found: false,
      minX: 180,
      maxX: 300,
      minY: 90,
      maxY: 250,
    },
  };

  return (
    <div
      id="gameBoardScreen"
      onClick={(e) => {
        popupWindow.removePopup(e);
      }}
    >
      <div id="gameBoardTimeTracking">
        <div>
          {timeTracker.formatTime(hours)} {timeTracker.formatTime(miniutes)}{" "}
          {timeTracker.formatTime(seconds)}
        </div>
      </div>
      <div>
        {/* <div style={{color: "white"}}>{score}</div> */}
        <img
          onClick={(e) => {
            popupWindow.generatePopup(e);
          }}
          id="gameBoardTargets"
          src={pokemonBkg}
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
          <div className="popupItem">Groudon</div>
          <div className="popupItem">Magneton</div>
          <div className="popupItem">Ho-Oh</div>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
