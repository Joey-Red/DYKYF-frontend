import React, { useState, useEffect, useRef } from "react";
import doux from "./assets/sheets/doux.png";
import tard from "./assets/sheets/tard.png";
import mort from "./assets/sheets/mort.png";
import vita from "./assets/sheets/vita.png";
import douxMirror from "./assets/sheets/douxMirror.png";
import tardMirror from "./assets/sheets/tardMirror.png";
import mortMirror from "./assets/sheets/mortMirror.png";
import vitaMirror from "./assets/sheets/vitaMirror.png";
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
  const [players, setPlayers] = useState({});
  const [frame, setFrame] = useState(0);
  const [spriteX, setSpriteX] = useState(500);
  const [spriteY, setSpriteY] = useState(500);
  const [direction, setDirection] = useState("right");
  const [isRunning, setIsRunning] = useState(false);
  const [refreshVar, setRefreshVar] = useState(20);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imageRef = useRef(null);
  const mirrorRef = useRef(null);
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

  // let framesToPlay;
  // if (player.username === "crazy maze") {
  //   console.log(player.direction, player.isRunning);
  // }
  // const frameWidth = image.width / numFrames;
  // if (player.isRunning) {
  //   if (player.direction === "left") {
  //     framesToPlay = mirrorRunningFrames;
  //   } else {
  //     framesToPlay = runningFrames;
  //   }
  // } else {
  //   if (player.direction === "left") {
  //     framesToPlay = mirrorIdleFrames;
  //   } else {
  //     framesToPlay = idleFrames;
  //   }
  // }
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
      } = data.data;

      // setPlayers((prevPlayers) => ({
      //   ...prevPlayers,
      //   [username]: {
      //     username: username,
      //     x: x,
      //     y: y,
      //     frameHeight: frameHeight,
      //     frameWidth: frameWidth,
      //     roomName: roomName,
      //     spriteHeight: spriteHeight,
      //     spriteWidth: spriteWidth,
      //     spriteX: spriteX,
      //     spriteY: spriteY,
      //     direction: direction,
      //     isRunning: isRunning,
      //   },
      // }));
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
    let image = imageRef.current;
    let mirror = mirrorRef.current;
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
    // let framesToPlay = idleFrames;
    // if (spriteX === prevSpriteXRef) {
    //   setIsRunning(false);
    // }
    let prevSpriteX;
    for (const playerName in players) {
      const player = players[playerName];

      console.log(prevSpriteX, player.spriteX);
      if (prevSpriteX === player.spriteX) {
        console.log("same", prevSpriteX, player.spriteX);
      } else {
        console.log("diff", prevSpriteX, player.spriteX);
      }
      prevSpriteX = player.spriteX;

      let framesToPlay;
      if (player.direction === "up" || player.direction === "down") {
        framesToPlay = idleFrames;
      } else {
        if (player.isRunning) {
          if (player.direction === "left") {
            framesToPlay = mirrorRunningFrames;
          } else if (player.direction === "right") {
            framesToPlay = runningFrames;
          }
        } else if (player.isRunning === false) {
          if (player.direction === "left") {
            framesToPlay = mirrorIdleFrames;
          } else {
            framesToPlay = idleFrames;
          }
        } else if (player.isRunning === undefined) {
          framesToPlay = mirrorRunningFrames;
        } else {
          framesToPlay = idleFrames;
        }
      }
      const numFramesToPlay = framesToPlay.length;
      const frameWidth = image.width / numFrames;
      const frameHeight = image.height;
      const frameIndex = framesToPlay[Math.floor(frame / numFramesToPlay)];
      const x = frameIndex * frameWidth;
      const y = 0;
      const spriteX = player.spriteX;
      const spriteY = player.spriteY;
      // const direction = player.direction;
      // Draw name
      ctx.fillText(player.username, player.spriteX + 24, player.spriteY - 8);
      // ctx.drawImage(
      //   player.direction === "left" ? mirror : image,
      //   x,
      //   y,
      //   frameWidth,
      //   frameHeight,
      //   spriteX,
      //   spriteY,
      //   spriteWidth,
      //   spriteHeight
      // );
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [frame]);

  useEffect(() => {
    let image = imageRef.current;
    let mirror = mirrorRef.current;
    let shadow = shadowRef.current;
    const frameWidth = image?.width / numFrames;
    const frameHeight = image?.height;
    const x = frame * frameWidth;
    const y = 0;
    const intervalId = setInterval(() => {
      setFrame((frame) => (frame + 1) % numFrames);
      socket.emit("player moved", {
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

      // }, 100);
    }, refreshVar);

    return () => {
      clearInterval(intervalId);
    };
  }, [frame]);

  function handleKeyDown(event) {
    let image = imageRef.current;
    let mirror = mirrorRef.current;
    let shadow = shadowRef.current;
    const frameWidth = image.width / numFrames;
    const frameHeight = image.height;
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
    const image = new Image();
    const mirror = new Image();
    const shadow = new Image();
    shadow.src = shadowBox;
    mirror.src = tardMirror;
    image.src = tard;
    shadowRef.current = shadow;
    imageRef.current = image;
    mirrorRef.current = mirror;
  }
  useEffect(() => {
    handleImageLoad();
  }, []);
  useEffect(() => {
    drawSprite();
  }, [frame, players]);

  return (
    <div className="w-full">
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
