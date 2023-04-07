import React, { useState, useEffect, useRef } from "react";
import doux from "./assets/sheets/doux.png";
import tard from "./assets/sheets/tard.png";
import mort from "./assets/sheets/mort.png";
import vita from "./assets/sheets/vita.png";
import douxMirror from "./assets/sheets/douxMirror.png";
import tardMirror from "./assets/sheets/tardMirror.png";
import mortMirror from "./assets/sheets/mortMirror.png";
import vitaMirror from "./assets/sheets/vitaMirror.png";
import tardStill from "./assets/charbuttons/tardStill.png";
import vitaStill from "./assets/charbuttons/vitaStill.png";
import mortStill from "./assets/charbuttons/mortStill.png";
import douxStill from "./assets/charbuttons/douxStill.png";
import { wrapText } from "./canvasTextWrapper";
import {
  lineWidth,
  redRect,
  blueRect,
  greenRect,
  orangeRect,
  circle,
  redSmallRect,
  blueSmallRect,
  greenSmallRect,
  orangeSmallRect,
  smallCircle,
  redMedRect,
  blueMedRect,
  greenMedRect,
  orangeMedRect,
  medCircle,
} from "./canvasVariables";
import DisplayQA from "./DisplayQA";

function CanvasComponent(props) {
  let {
    roomName,
    username,
    isHost,
    socket,
    io,
    socketId,
    QAArray,
    correctAnswerColor,
    setCorrectAnswerColor,
  } = props;
  let [chosenChar, setChosenChar] = useState(tard);
  let [chosenCharMirror, setChosenCharMirror] = useState(tardMirror);
  const [players, setPlayers] = useState({});
  const [frame, setFrame] = useState(0);
  const [spriteX, setSpriteX] = useState(500);
  const [spriteY, setSpriteY] = useState(500);
  const [direction, setDirection] = useState("right");
  const [isRunning, setIsRunning] = useState(false);
  const [refreshVar, setRefreshVar] = useState(20);
  let [showColorMenu, setShowColorMenu] = useState(false);
  const [size, setSize] = useState("small");
  const [updatedPlayers, setUpdatedPlayers] = useState(null);
  const [hideName, setHideName] = useState(false);
  const [isWinner, setIsWinner] = useState(false);
  const [scale, setScale] = useState(1);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  // const imageRef = useRef(null);
  // const mirrorRef = useRef(null);
  const mortRef = useRef(null);
  const vitaRef = useRef(null);
  const douxRef = useRef(null);
  const tardRef = useRef(null);
  const mortMirrorRef = useRef(null);
  const vitaMirrorRef = useRef(null);
  const douxMirrorRef = useRef(null);
  const tardMirrorRef = useRef(null);

  const usernameRef = useRef("");
  const numFrames = 24;
  let canvasWidth = 900;
  let canvasHeight = 900;

  const spriteWidth = 48;
  const spriteHeight = 40;
  const idleFrames = [0, 1, 2, 3, 4];
  const runningFrames = [17, 18, 19, 20, 21, 22, 23];
  const mirrorRunningFrames = [0, 1, 2, 3, 4, 5, 6];
  const mirrorIdleFrames = [19, 20, 21, 22, 23];
  useEffect(() => {
    socket.on("update player", (data) => {
      const {
        socketId,
        username,
        x,
        y,
        frameHeight,
        frameWidth,
        spriteX,
        spriteY,
        roomName,
        direction,
        isRunning,
        chosenChar,
      } = data.data;

      setPlayers((prevPlayers) => {
        return {
          ...prevPlayers,
          [username]: {
            username: username,
            x: x,
            y: y,
            frameHeight: frameHeight,
            frameWidth: frameWidth,
            roomName: roomName,
            spriteHeight: spriteHeight,
            spriteWidth: spriteWidth,
            socketId: socketId,
            spriteX: spriteX,
            spriteY: spriteY,
            direction: direction,
            isRunning: isRunning,
            chosenChar: chosenChar,
          },
        };
      });
    });

    socket.on("players", (data) => {
      setPlayers((prevPlayers) => {
        const newPlayers = { ...prevPlayers };
        // loop through the previous players
        for (const id in newPlayers) {
          // check if the id is not in the new data
          if (!(id in data)) {
            // remove the player from the new players object
            delete newPlayers[id];
          }
        }
        return newPlayers;
      });
    });
    socket.on("disconnect", () => {});
  }, []);
  useEffect(() => {
    let char = Math.floor(Math.random() * 4) + 1;
    if (char === 1) {
      setChosenChar(mort);
    }
    if (char === 2) {
      setChosenChar(tard);
    }
    if (char === 3) {
      setChosenChar(doux);
    }
    if (char === 4) {
      setChosenChar(vita);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    usernameRef.current = username;
    if (
      document.documentElement.clientWidth < 600 ||
      document.documentElement.clientHeight < 850
    ) {
      canvas.height = 300;
      canvas.width = 300;
      setSize("small");
      canvasHeight = 300;
      canvasWidth = 300;
      let rX = Math.floor(Math.random() * 875) + 15;
      let rY = Math.floor(Math.random() * 875) + 15;
      setSpriteX(rX);
      setSpriteY(rY);
    } else if (
      document.documentElement.clientWidth < 899 ||
      document.documentElement.clientHeight < 1149
    ) {
      canvas.height = 600;
      canvas.width = 600;
      setSize("medium");
      canvasHeight = 600;
      canvasWidth = 600;
      let rX = Math.floor(Math.random() * 575) + 15;
      let rY = Math.floor(Math.random() * 575) + 15;
      setSpriteX(rX);
      setSpriteY(rY);
    } else {
      canvas.height = 900;
      canvas.width = 900;
      setSize("large");
      canvasHeight = 900;
      canvasWidth = 900;
      let rX = Math.floor(Math.random() * 875) + 15;
      let rY = Math.floor(Math.random() * 875) + 15;
      setSpriteX(rX);
      setSpriteY(rY);
    }
  }, [
    size,
    document.documentElement.clientHeight,
    document.documentElement.clientWidth,
  ]);

  function drawSprite() {
    const ctx = ctxRef.current;
    let mort = mortRef.current;
    let vita = vitaRef.current;
    let doux = douxRef.current;
    let tard = tardRef.current;
    let mortMirror = mortMirrorRef.current;
    let vitaMirror = vitaMirrorRef.current;
    let douxMirror = douxMirrorRef.current;
    let tardMirror = tardMirrorRef.current;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    let shapeSizes;
    const shapes = [redRect, blueRect, greenRect, orangeRect, circle];
    const smallShapes = [
      redSmallRect,
      blueSmallRect,
      greenSmallRect,
      orangeSmallRect,
      smallCircle,
    ];
    const medShapes = [
      redMedRect,
      blueMedRect,
      greenMedRect,
      orangeMedRect,
      medCircle,
    ];
    if (size === "small") {
      shapeSizes = smallShapes;
    } else if (size === "medium") {
      shapeSizes = medShapes;
    } else {
      shapeSizes = shapes;
    }
    shapeSizes.forEach((shape) => {
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      // if (shape.hasOwnProperty("radius") && shape.radius > 100) {
      if (shape.hasOwnProperty("radius") && shape.radius > 60) {
        ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      } else {
        ctx.roundRect(
          shape.x,
          shape.y,
          shape.width,
          shape.height,
          shape.radius
        );
      }
      ctx.stroke();
      ctx.fillStyle = shape.color;
      ctx.fill();
    });
    let maxWidth = 400;
    let midPoint = 450;
    const lineHeight = 28;
    const textY = canvasHeight;
    const text = "DO YOU KNOW YOUR FRIENDS?";
    ctx.font = "30px LemonMilk";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const textLength = (text.length / 5) * 1.5;
    if (size === "small") {
      ctx.fillText("DYKYF?", 150, 150);
    } else if (size === "medium") {
      ctx.fillText("DYKYF?", 300, 300);
    } else {
      wrapText(
        ctx,
        text,
        midPoint,
        textY / 2 - textLength,
        maxWidth,
        lineHeight
      );
    }
    for (const playerName in players) {
      const player = players[playerName];
      let framesToPlay;
      if (size === "small") {
        ctx.font = "15px LemonMilk";
        if (username === player.username) {
        }
        if (username === player.username) {
          ctx.fillStyle = "black";
        } else {
          ctx.fillStyle = "white";
        }
        ctx.fillText(
          player.username,
          (player.spriteX + 24) / 3,
          (player.spriteY - 8) / 3.3
        );
      } else if (size === "medium") {
        ctx.font = "18px LemonMilk";
        if (username === player.username) {
        }
        if (username === player.username) {
          ctx.fillStyle = "black";
        } else {
          ctx.fillStyle = "white";
        }
        ctx.fillText(
          player.username,
          (player.spriteX + 24) / 1.5,
          (player.spriteY - 8) / 1.5
        );
      } else {
        ctx.font = "20px LemonMilk";
        if (username === player.username) {
          ctx.fillStyle = "black";
        } else {
          ctx.fillStyle = "white";
        }
        ctx.fillText(player.username, player.spriteX + 24, player.spriteY - 8);
      }

      if (player.direction !== "up" && player.direction !== "down") {
        // handle left and right directions
        if (player.isRunning) {
          if (player.direction === "left") {
            framesToPlay = mirrorRunningFrames;
          } else if (player.direction === "right") {
            framesToPlay = runningFrames;
          }
        } else if (player.isRunning === undefined) {
          framesToPlay = mirrorRunningFrames;
        } else {
          if (player.direction === "left") {
            framesToPlay = mirrorIdleFrames;
          } else if (player.direction === "right") {
            framesToPlay = idleFrames;
          }
        }
      } else {
        framesToPlay = idleFrames; // or any other default value
      }
      const numFramesToPlay = framesToPlay.length;
      const frameIndex = framesToPlay[Math.floor(frame / numFramesToPlay)];
      let image;
      let mirror;
      console.log(player.chosenChar.split("/"));
      console.log(player.chosenChar.split("/")[4]);
      // ["", "assets", "tard-349914c0.png"];
      // let trimChar = player.chosenChar.split("/")[4].slice(0, -4);
      let trimChar = player.chosenChar.split("/")[2];
      if (trimChar.includes("mort")) {
        image = mort;
        mirror = mortMirror;
      } else if (trimChar.includes("vita")) {
        image = vita;
        mirror = vitaMirror;
      } else if (trimChar.includes("tard")) {
        image = tard;
        mirror = tardMirror;
      } else if (trimChar.includes("doux")) {
        image = doux;
        mirror = douxMirror;
      }

      const x = frameIndex * player.frameWidth;
      if (size === "small") {
        if (player.isRunning) {
          if (player.direction === "left") {
            ctx.drawImage(
              mirror,
              // player.frameWidth * runningFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX / 3.3,
              player.spriteY / 3.3,
              player.spriteWidth,
              player.spriteHeight
            );
          } else {
            ctx.drawImage(
              image,
              // player.frameWidth * runningFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX / 3.3,
              player.spriteY / 3.3,
              player.spriteWidth,
              player.spriteHeight
            );
          }
        } else {
          if (player.direction === "left") {
            ctx.drawImage(
              mirror,
              // player.frameWidth * idleFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX / 3.3,
              player.spriteY / 3.3,
              player.spriteWidth,
              player.spriteHeight
            );
          } else {
            ctx.drawImage(
              image,
              // player.frameWidth * idleFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX / 3.3,
              player.spriteY / 3.3,
              player.spriteWidth,
              player.spriteHeight
            );
          }
        }
      }
      // here
      else if (size === "medium") {
        if (player.isRunning) {
          if (player.direction === "left") {
            ctx.drawImage(
              mirror,
              // player.frameWidth * runningFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX / 1.5,
              player.spriteY / 1.5,
              player.spriteWidth,
              player.spriteHeight
            );
          } else {
            ctx.drawImage(
              image,
              // player.frameWidth * runningFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX / 1.5,
              player.spriteY / 1.5,
              player.spriteWidth,
              player.spriteHeight
            );
          }
        } else {
          if (player.direction === "left") {
            ctx.drawImage(
              mirror,
              // player.frameWidth * idleFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX / 1.5,
              player.spriteY / 1.5,
              player.spriteWidth,
              player.spriteHeight
            );
          } else {
            ctx.drawImage(
              image,
              // player.frameWidth * idleFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX / 1.5,
              player.spriteY / 1.5,
              player.spriteWidth,
              player.spriteHeight
            );
          }
        }
      } else {
        if (player.isRunning) {
          if (player.direction === "left") {
            ctx.drawImage(
              mirror,
              // player.frameWidth * runningFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX,
              player.spriteY,
              player.spriteWidth,
              player.spriteHeight
            );
          } else {
            ctx.drawImage(
              image,
              // player.frameWidth * runningFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX,
              player.spriteY,
              player.spriteWidth,
              player.spriteHeight
            );
          }
        } else {
          if (player.direction === "left") {
            ctx.drawImage(
              mirror,
              // player.frameWidth * idleFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX,
              player.spriteY,
              player.spriteWidth,
              player.spriteHeight
            );
          } else {
            ctx.drawImage(
              image,
              // player.frameWidth * idleFrames[frame % numFrames],
              x,
              0,
              player.frameWidth,
              player.frameHeight,
              player.spriteX,
              player.spriteY,
              player.spriteWidth,
              player.spriteHeight
            );
          }
        }
      }
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [frame]);

  useEffect(() => {
    let image = douxRef.current;
    let mirror = douxMirrorRef.current;
    const frameWidth = image?.width / numFrames;
    const frameHeight = image?.height;
    const x = frame * frameWidth;
    const y = 0;
    const intervalId = setInterval(() => {
      setFrame((frame) => (frame + 1) % numFrames);
      socket.emit("player moved", {
        chosenChar,
        username: username,
        direction,
        roomName,
        isRunning,
        spriteX,
        spriteY,
        frameHeight,
        frameWidth,
        x,
        y,
      });
    }, refreshVar);

    return () => {
      clearInterval(intervalId);
    };
  }, [frame]);

  function handleKeyDown(event) {
    let image = douxRef.current;
    let mirror = douxMirrorRef.current;
    const frameWidth = image.width / numFrames;
    const frameHeight = 24;
    const x = frame * frameWidth;
    const y = 0;
    const speed = 20;
    switch (event.code) {
      case "ArrowRight":
        if (spriteX < canvasWidth - spriteWidth) {
          setSpriteX((prevSpriteX) => prevSpriteX + speed);
          setDirection("right");
          setIsRunning(true);
          socket.emit("player moved", {
            chosenChar,
            direction,
            username,
            roomName,
            x,
            y,
            frameWidth,
            frameHeight,
            spriteX,
            spriteY,
            spriteWidth,
            spriteHeight,
            isRunning,
          });
        }
        break;
      case "ArrowLeft":
        if (spriteX > 0) {
          setSpriteX((prevSpriteX) => prevSpriteX - speed);
          setDirection("left");
          setIsRunning(true);
          socket.emit("player moved", {
            chosenChar,
            direction,
            username,
            roomName,
            x,
            y,
            frameWidth,
            frameHeight,
            spriteX,
            spriteY,
            spriteWidth,
            spriteHeight,
          });
        }

        break;
      case "ArrowUp":
        if (spriteY > 0) {
          setSpriteY((prevSpriteY) => prevSpriteY - speed);
          setDirection("up");
          setIsRunning(true);
          socket.emit("player moved", {
            chosenChar,
            direction,
            username,
            roomName,
            x,
            y,
            frameWidth,
            frameHeight,
            spriteX,
            spriteY,
            spriteWidth,
            spriteHeight,
          });
        }

        break;
      case "ArrowDown":
        if (spriteY < canvasHeight - spriteHeight) {
          setSpriteY((prevSpriteY) => prevSpriteY + speed);
          setDirection("down");
          setIsRunning(true);
          socket.emit("player moved", {
            chosenChar,
            direction,
            username,
            roomName,
            x,
            y,
            frameWidth,
            frameHeight,
            spriteX,
            spriteY,
            spriteWidth,
            spriteHeight,
          });
        }

        break;
      default:
        break;
    }
  }

  function handleImageLoad() {
    const mortImg = new Image();
    const vitaImg = new Image();
    const douxImg = new Image();
    const tardImg = new Image();
    mortImg.src = mort;
    vitaImg.src = vita;
    tardImg.src = tard;
    douxImg.src = doux;
    const mortImgMirror = new Image();
    const vitaImgMirror = new Image();
    const douxImgMirror = new Image();
    const tardImgMirror = new Image();

    mortImgMirror.src = mortMirror;
    vitaImgMirror.src = vitaMirror;
    tardImgMirror.src = tardMirror;
    douxImgMirror.src = douxMirror;

    mortRef.current = mortImg;
    vitaRef.current = vitaImg;
    tardRef.current = tardImg;
    douxRef.current = douxImg;

    mortMirrorRef.current = mortImgMirror;
    vitaMirrorRef.current = vitaImgMirror;
    tardMirrorRef.current = tardImgMirror;
    douxMirrorRef.current = douxImgMirror;
  }
  useEffect(() => {
    handleImageLoad();
    // playGame(QAArray);
  }, [chosenChar]);
  useEffect(() => {
    drawSprite();
  }, [frame, players]);
  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setHideName(true);
    }, 4000);
  }, []);

  return (
    <div className="w-full max-h-screen">
      {!showColorMenu && (
        <button
          className="absolute z-50 top-0 left-0 "
          onClick={() => setShowColorMenu(!showColorMenu)}
        >
          <img src={mortStill} alt="chosen char" />
        </button>
      )}
      {showColorMenu && (
        <div className="absolute z-50 top-0 left-0 bottom-0 ">
          <button
            onClick={() => {
              setChosenChar(mort);
              setChosenCharMirror(mortMirror);
              setShowColorMenu(!showColorMenu);
            }}
          >
            <img src={mortStill} alt="mort" />
          </button>
          <button
            onClick={() => {
              setChosenChar(tard);
              setChosenCharMirror(tardMirror);
              setShowColorMenu(!showColorMenu);
            }}
          >
            <img src={tardStill} alt="tard" />
          </button>
          <button
            onClick={() => {
              setChosenChar(doux);
              setChosenCharMirror(douxMirror);
              setShowColorMenu(!showColorMenu);
            }}
          >
            <img src={douxStill} alt="doux" />
          </button>
          <button
            onClick={() => {
              setChosenChar(vita);
              setChosenCharMirror(vitaMirror);
              setShowColorMenu(!showColorMenu);
            }}
          >
            <img src={vitaStill} alt="vita" />
          </button>
        </div>
      )}
      <div className="absolute flex-col top-0 right-0 left-0 bottom-0 justify-center flex flex-center items-center">
        <DisplayQA
          QAArray={QAArray}
          isHost={isHost}
          socket={socket}
          io={io}
          roomName={roomName}
          players={players}
          updatedPlayers={updatedPlayers}
          username={username}
          correctAnswerColor={correctAnswerColor}
          setCorrectAnswerColor={setCorrectAnswerColor}
          isWinner={isWinner}
          setIsWinner={setIsWinner}
        />
        {!hideName && (
          <p className="bg-black border-4 border-white p-4 rounded absolute text-white font-[5rem]">
            You are {username}
          </p>
        )}
        <canvas
          className="bg-neutral-900  border-white border-2 rounded"
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
          tabIndex={0}
        />
      </div>
    </div>
  );
}

export default CanvasComponent;
