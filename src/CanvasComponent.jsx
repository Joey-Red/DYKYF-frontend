import React, { useState, useEffect, useRef } from "react";
import doux from "./assets/sheets/doux.png";
import tard from "./assets/sheets/tard.png";
import mort from "./assets/sheets/mort.png";
import vita from "./assets/sheets/vita.png";
import douxMirror from "./assets/sheets/douxMirror.png";
import tardMirror from "./assets/sheets/tardMirror.png";
import mortMirror from "./assets/sheets/mortMirror.png";
import vitaMirror from "./assets/sheets/vitaMirror.png";
import Questions from "./Questions";
import shadowBox from "./assets/misc/shadow_2.png";
function CanvasComponent(props) {
  let { roomName, username, isHost, socket, io } = props;
  const [players, setPlayers] = useState({});
  const [frame, setFrame] = useState(0);
  const [spriteX, setSpriteX] = useState(500);
  const [spriteY, setSpriteY] = useState(500);
  const [direction, setDirection] = useState("right");
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imageRef = useRef(null);
  const mirrorRef = useRef(null);
  const shadowRef = useRef(null);
  const usernameRef = useRef("");
  const numFrames = 24;
  const canvasWidth = 1000;
  const canvasHeight = 1000;
  const spriteWidth = 48;
  const spriteHeight = 40;

  useEffect(() => {
    // socket.on("update player", ( => {
    //   // setData(;
    // });
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
      } = data.data;
      setPlayers((prevPlayers) => ({
        ...prevPlayers,
        [username]: {
          x: x,
          y: y,
          frameHeight: frameHeight,
          frameWidth: frameWidth,
          roomName: roomName,
          spriteHeight: spriteHeight,
          spriteWidth: spriteWidth,
          spriteX: spriteX,
          spriteY: spriteY,
        },
      }));
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

  function drawSprite(direction) {
    const ctx = ctxRef.current;
    let image = imageRef.current;
    let mirror = mirrorRef.current;
    let shadow = shadowRef.current;

    const frameWidth = image.width / numFrames;
    const frameHeight = image.height;
    const x = frame * frameWidth;
    const y = 0;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.roundRect(50, 50, 400, 400, 12);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(550, 50, 400, 400, 12);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(50, 550, 400, 400, 12);
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(550, 550, 400, 400, 12);
    ctx.stroke();
    ctx.fillStyle = "orange";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(500, 500, 240, 0, 2 * Math.PI);
    ctx.fillStyle = "#171717";
    ctx.stroke();
    ctx.fill();

    function wrapText(ctx, text, x, textY, maxWidth, lineHeight) {
      var words = text.split(" ");
      var line = "";
      for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        var metrics = ctx.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
          ctx.fillText(line, x, textY);
          line = words[n] + " ";
          textY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, textY);
    }
    var maxWidth = 400;
    var lineHeight = 24;
    var textY = canvasHeight;
    var text = `What is your favorite childhood memory?`;
    ctx.font = "20px Permanent Marker";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var textLength = (text.length / 5) * 1.5;
    // 1 line = 5 words
    // 11px per line
    // every 5 words add 1 rem height
    wrapText(ctx, text, 500, textY / 2 - textLength, maxWidth, lineHeight);
    ctx.drawImage(shadow, spriteX, spriteY, spriteWidth, spriteHeight);

    // DRAW OTHER PLAYERS
    for (const [username, player] of Object.entries(players)) {
      // Skip drawing the current user's own character
      if (username === usernameRef.current) continue;

      // Draw the player's sprite on the canvas
      ctx.drawImage(
        mirror,
        x,
        y,
        frameWidth,
        frameHeight,
        player.spriteX,
        player.spriteY,
        player.spriteWidth,
        player.spriteHeight
      );
    }

    if (direction === "right") {
      ctx.drawImage(
        image,
        x,
        y,
        frameWidth,
        frameHeight,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight
      );
    }
    if (direction === "left") {
      ctx.drawImage(
        mirror,
        x,
        y,
        frameWidth,
        frameHeight,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight
      );
    }
    if (direction === "down") {
      ctx.drawImage(
        image,
        x,
        y,
        frameWidth,
        frameHeight,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight
      );
    }
    if (direction === "up") {
      ctx.drawImage(
        image,
        x,
        y,
        frameWidth,
        frameHeight,
        spriteX,
        spriteY,
        spriteWidth,
        spriteHeight
      );
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [frame, spriteX, spriteY]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrame((frame) => (frame + 1) % numFrames);
    }, 125);

    // Return a cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  function handleKeyDown(event) {
    let image = imageRef.current;
    let mirror = mirrorRef.current;
    let shadow = shadowRef.current;

    const frameWidth = image.width / numFrames;
    const frameHeight = image.height;
    const x = frame * frameWidth;
    const y = 0;
    // setFrame((frame) => frame + 1);
    const speed = 15;
    switch (event.code) {
      case "ArrowRight":
        if (spriteX < canvasWidth - spriteWidth) {
          setSpriteX((prevX) => prevX + speed);
          // setFrame((frame) => (frame + 1) % numFrames);
          setDirection("right");
          socket.emit("player moved", {
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
      case "ArrowLeft":
        if (spriteX > 0) {
          setSpriteX((prevX) => prevX - speed);
          // setFrame((frame) => (frame + 1) % numFrames);
          setDirection("left");
          socket.emit("player moved", {
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
          setSpriteY((prevY) => prevY - speed);
          // setFrame((frame) => (frame + 1) % numFrames);
          setDirection("up");
          socket.emit("player moved", {
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
          setSpriteY((prevY) => prevY + speed);
          // setFrame((frame) => (frame + 1) % numFrames);
          drawSprite("down");
          socket.emit("player moved", {
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
    drawSprite(direction);
  }, [frame, spriteX, spriteY]);

  return (
    <div className="w-full">
      <div className="relative justify-center flex flex-center items-center">
        <canvas
          // bg-chessTexture bg-center
          className="bg-neutral-900  border-white border-2 rounded"
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    </div>
  );
}

export default CanvasComponent;
