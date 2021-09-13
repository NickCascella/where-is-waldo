import React, { useEffect } from "react";
import { useState } from "react";
import pokemonBkg from "../images/waldoPokemonBackground.JPG";

const GameBoard = () => {
  const [seconds, setSeconds] = useState(0);
  const [miniutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [time, setTime] = useState([0, 0, 0]);

  useEffect(() => {
    timeTracker.startTimer();
  }, []);

  const timer = () => {
    if (timeTracker.seconds < 10) {
      timeTracker.seconds += 1;
      setSeconds(timeTracker.seconds);
      timeTracker.stopTimer();
    } else if (timeTracker.miniutes < 1) {
      timeTracker.miniutes += 1;
      setMinutes(timeTracker.miniutes);
      timeTracker.seconds = 0;
      setSeconds(timeTracker.seconds);
    } else if (timeTracker.hours < 2) {
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
      clearInterval(timeTracker.startTimer);
    },
  };

  const checkClick = (e) => {
    let x = e.nativeEvent.offsetX;
    let y = e.nativeEvent.offsetY;
    console.log(x);
    console.log(y);
  };

  return (
    <div id="gameBoardScreen">
      <div id="gameBoardTimeTracking">
        <div>
          {hours} {miniutes} {seconds}
        </div>
      </div>
      <div
        onClick={(e) => {
          checkClick(e);
        }}
      >
        <img id="gameBoardTargets" src={pokemonBkg}></img>
      </div>
    </div>
  );
};

export default GameBoard;
