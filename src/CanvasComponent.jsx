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
import shadowBox from "./assets/misc/shadow_2.png";
import {
  lineWidth,
  redRect,
  blueRect,
  greenRect,
  orangeRect,
  circle,
} from "./canvasVariables";

function CanvasComponent(props) {
  let { roomName, username, isHost, socket, io } = props;
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

  const shadowRef = useRef(null);
  const usernameRef = useRef("");
  const canvasWidth = 1000;
  const numFrames = 24;
  const canvasHeight = 1000;
  const spriteWidth = 48;
  const spriteHeight = 40;
  const idleFrames = [0, 1, 2, 3, 4];
  const runningFrames = [17, 18, 19, 20, 21, 22, 23];
  const mirrorRunningFrames = [0, 1, 2, 3, 4, 5, 6];
  const mirrorIdleFrames = [19, 20, 21, 22, 23];

  useEffect(() => {
    socket.on("update player", (data) => {
      const {
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
            spriteX: spriteX,
            spriteY: spriteY,
            direction: direction,
            isRunning: isRunning,
            chosenChar: chosenChar,
          },
        };
      });
    });
    socket.on("disconnect", () => {
      console.log("disconnected from server");
    });
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    usernameRef.current = username;
  }, []);

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
    const shapes = [redRect, blueRect, greenRect, orangeRect, circle];
    shapes.forEach((shape) => {
      ctx.lineWidth = lineWidth;
      ctx.beginPath();
      if (shape.hasOwnProperty("radius") && shape.radius > 100) {
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
    const maxWidth = 400;
    const lineHeight = 24;
    const textY = canvasHeight;
    const text = "What is your favorite childhood memory?";
    ctx.font = "20px Permanent Marker";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    const textLength = (text.length / 5) * 1.5;

    wrapText(ctx, text, 500, textY / 2 - textLength, maxWidth, lineHeight);
    for (const playerName in players) {
      const player = players[playerName];
      let framesToPlay;
      ctx.fillText(player.username, player.spriteX + 24, player.spriteY - 8);

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
      let trimChar = player.chosenChar.split("/")[4].slice(0, -4);
      if (trimChar === "mort") {
        image = mort;
        mirror = mortMirror;
      } else if (trimChar === "vita") {
        image = vita;
        mirror = vitaMirror;
      } else if (trimChar === "tard") {
        image = tard;
        mirror = tardMirror;
      } else if (trimChar === "doux") {
        image = doux;
        mirror = douxMirror;
      }

      const x = frameIndex * player.frameWidth;
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

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [frame]);

  useEffect(() => {
    let image = douxRef.current;
    let mirror = douxMirrorRef.current;
    let shadow = shadowRef.current;
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
    let shadow = shadowRef.current;
    const frameWidth = image.width / numFrames;
    const frameHeight = 24;
    const x = frame * frameWidth;
    const y = 0;
    const speed = 10;
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
    const shadow = new Image();
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

    shadow.src = shadowBox;
    shadowRef.current = shadow;
  }
  useEffect(() => {
    handleImageLoad();
  }, [chosenChar]);
  useEffect(() => {
    drawSprite();
  }, [frame, players]);

  return (
    <div className="w-full">
      {!showColorMenu && (
        <button
          className="absolute z-50"
          onClick={() => setShowColorMenu(!showColorMenu)}
        >
          <img src={mortStill} alt="chosen char" />
        </button>
      )}
      {showColorMenu && (
        <div className="absolute z-50">
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
      <div className="relative justify-center flex flex-center items-center">
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
