import React, { useState, useEffect, useRef } from "react";
import doux from "./assets/sheets/doux.png";
import tard from "./assets/sheets/tard.png";
import mort from "./assets/sheets/mort.png";
import vita from "./assets/sheets/vita.png";
import douxMirror from "./assets/sheets/douxMirror.png";
import tardMirror from "./assets/sheets/tardMirror.png";
import mortMirror from "./assets/sheets/mortMirror.png";
import vitaMirror from "./assets/sheets/vitaMirror.png";
import shadowBox from "./assets/misc/shadow_2.png";
function Bots() {
  const [frame, setFrame] = useState(0);
  const [spriteX, setSpriteX] = useState(250);
  const [spriteY, setSpriteY] = useState(250);
  const [botOneCords, setBotOneCords] = useState({ x: 250, y: 250 });
  const [botTwoCords, setBotTwoCords] = useState({ x: 250, y: 250 });
  const [botThreeCords, setBotThreeCords] = useState({ x: 250, y: 250 });
  const [direction, setDirection] = useState("right");
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const imageRef = useRef(null);
  const botRef1 = useRef(null);
  const botRef2 = useRef(null);
  const botRef3 = useRef(null);
  const mirrorRef = useRef(null);
  const shadowRef = useRef(null);
  // const moveBotsIntervalRef = useRef(null);

  const numFrames = 24;
  const canvasWidth = 500;
  const canvasHeight = 500;
  const spriteWidth = 48;
  const spriteHeight = 40;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
  }, []);

  function drawSprite(direction) {
    const ctx = ctxRef.current;
    let image = imageRef.current;
    let bot1 = botRef1.current;
    let bot2 = botRef2.current;
    let bot3 = botRef3.current;
    let mirror = mirrorRef.current;
    let shadow = shadowRef.current;

    const frameWidth = image.width / numFrames;
    const frameHeight = image.height;
    const x = frame * frameWidth;
    const y = 0;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.roundRect(25, 25, 200, 200, 12);
    ctx.stroke();
    ctx.fillStyle = "red";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(275, 25, 200, 200, 12);
    ctx.stroke();
    ctx.fillStyle = "blue";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(25, 275, 200, 200, 12);
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();

    ctx.beginPath();
    ctx.roundRect(275, 275, 200, 200, 12);
    ctx.stroke();
    ctx.fillStyle = "orange";
    ctx.fill();

    ctx.beginPath();
    ctx.arc(250, 250, 120, 0, 2 * Math.PI);
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
    var maxWidth = 200;
    var lineHeight = 24;
    var textY = canvasHeight;
    var text = `Do you know your friends?`;
    ctx.font = "20px Permanent Marker";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    var textLength = (text.length / 5) * 1.5;
    // 1 line = 5 words
    // 11px per line
    // every 5 words add 1 rem height
    wrapText(ctx, text, 250, textY / 2 - textLength, maxWidth, lineHeight);
    ctx.drawImage(shadow, spriteX, spriteY, spriteWidth, spriteHeight);
    // Draw Bots
    ctx.drawImage(
      bot1,
      x,
      y,
      frameWidth,
      frameHeight,
      botOneCords.x,
      botOneCords.y,
      spriteWidth,
      spriteHeight
    );
    ctx.drawImage(
      bot2,
      x,
      y,
      frameWidth,
      frameHeight,
      botTwoCords.x,
      botTwoCords.y,
      spriteWidth,
      spriteHeight
    );
    ctx.drawImage(
      bot3,
      x,
      y,
      frameWidth,
      frameHeight,
      botThreeCords.x,
      botThreeCords.y,
      spriteWidth,
      spriteHeight
    );
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
    let movement1 = Math.floor(Math.random() * 6) + 1;
    let movement2 = Math.floor(Math.random() * 6) + 1;
    let movement3 = Math.floor(Math.random() * 6) + 1;

    if (movement1 >= 5) {
      return;
    } else if (movement1 === 2 && botOneCords.x < canvasWidth - spriteWidth) {
      setBotOneCords({ x: botOneCords.x + 15, y: botOneCords.y });
    } else if (movement1 === 1 && botOneCords.x > 0) {
      setBotOneCords({ x: botOneCords.x - 15, y: botOneCords.y });
    } else if (movement1 === 4 && botOneCords.y > 0) {
      setBotOneCords({ x: botOneCords.x, y: botOneCords.y - 15 });
    } else if (movement1 === 3 && botOneCords.y < canvasHeight - spriteHeight) {
      setBotOneCords({ x: botOneCords.x, y: botOneCords.y + 15 });
    }

    if (movement2 >= 5) {
      return;
    } else if (movement2 === 1 && botTwoCords.x < canvasWidth - spriteWidth) {
      setBotTwoCords({ x: botTwoCords.x + 15, y: botTwoCords.y });
    } else if (movement2 === 3 && botTwoCords.x > 0) {
      setBotTwoCords({ x: botTwoCords.x - 15, y: botTwoCords.y });
    } else if (movement2 === 4 && botTwoCords.y > 0) {
      setBotTwoCords({ x: botTwoCords.x, y: botTwoCords.y - 15 });
    } else if (movement2 === 4 && botTwoCords.y < canvasHeight - spriteHeight) {
      setBotTwoCords({ x: botTwoCords.x, y: botTwoCords.y + 15 });
    }
    if (movement3 >= 5) {
      return;
    } else if (movement3 === 4 && botThreeCords.x < canvasWidth - spriteWidth) {
      setBotThreeCords({ x: botThreeCords.x + 15, y: botThreeCords.y });
    } else if (movement3 === 3 && botThreeCords.x > 0) {
      setBotThreeCords({ x: botThreeCords.x - 15, y: botThreeCords.y });
    } else if (movement3 === 2 && botThreeCords.y > 0) {
      setBotThreeCords({ x: botThreeCords.x, y: botThreeCords.y - 15 });
    } else if (
      movement3 === 1 &&
      botThreeCords.y < canvasHeight - spriteHeight
    ) {
      setBotThreeCords({ x: botThreeCords.x, y: botThreeCords.y + 15 });
    }
  }, [frame]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // clearInterval(moveBotsIntervalRef.current);
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
    // setFrame((frame) => frame + 1);
    const speed = 15;
    switch (event.code) {
      case "ArrowRight":
        if (spriteX < canvasWidth - spriteWidth) {
          setSpriteX((prevX) => prevX + speed);
          // setFrame((frame) => (frame + 1) % numFrames);
          setDirection("right");
        }
        break;
      case "ArrowLeft":
        if (spriteX > 0) {
          setSpriteX((prevX) => prevX - speed);
          // setFrame((frame) => (frame + 1) % numFrames);
          setDirection("left");
        }
        break;
      case "ArrowUp":
        if (spriteY > 0) {
          setSpriteY((prevY) => prevY - speed);
          // setFrame((frame) => (frame + 1) % numFrames);
          setDirection("up");
        }
        break;
      case "ArrowDown":
        if (spriteY < canvasHeight - spriteHeight) {
          setSpriteY((prevY) => prevY + speed);
          // setFrame((frame) => (frame + 1) % numFrames);
          drawSprite("down");
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
    const bot1 = new Image();
    const bot2 = new Image();
    const bot3 = new Image();
    bot1.src = mort;
    bot2.src = doux;
    bot3.src = vita;
    shadow.src = shadowBox;
    mirror.src = tardMirror;
    image.src = tard;

    botRef1.current = bot1;
    botRef2.current = bot2;
    botRef3.current = bot3;

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
  // useEffect(() => {
  //   console.log("ran");
  //   const maxMovement = 15;
  // let bot1 = botRef1.current;
  // let bot2 = botRef2.current;
  // let bot3 = botRef3.current;
  //   moveBotsIntervalRef.current = setInterval(() => {
  //     // Update the position of bot1
  //     setBotOneCords((prevState) => ({
  //       x:
  //         prevState.x +
  //         Math.floor(Math.random() * (2 * maxMovement + 1) - maxMovement),
  //       y:
  //         prevState.y +
  //         Math.floor(Math.random() * (2 * maxMovement + 1) - maxMovement),
  //     }));
  //     ctxRef.current.clearRect(
  //       botOneCords.x,
  //       botOneCords.y,
  //       spriteWidth,
  //       spriteHeight
  //     );
  //     // Draw bot1 at its new position
  //     ctxRef.current.drawImage(
  //       bot1,
  //       botOneCords.x,
  //       botOneCords.y,
  //       spriteWidth,
  //       spriteHeight
  //     );

  //     // Update the position of bot2
  //     setBotTwoCords((prevState) => ({
  //       x:
  //         prevState.x +
  //         Math.floor(Math.random() * (2 * maxMovement + 1) - maxMovement),
  //       y:
  //         prevState.y +
  //         Math.floor(Math.random() * (2 * maxMovement + 1) - maxMovement),
  //     }));
  //     ctxRef.current.clearRect(
  //       botTwoCords.x,
  //       botTwoCords.y,
  //       spriteWidth,
  //       spriteHeight
  //     );
  //     // Draw bot1 at its new position
  //     ctxRef.current.drawImage(
  //       bot2,
  //       botTwoCords.x,
  //       botTwoCords.y,
  //       spriteWidth,
  //       spriteHeight
  //     );
  //     // Update the position of bot3
  //     setBotThreeCords((prevState) => ({
  //       x:
  //         prevState.x +
  //         Math.floor(Math.random() * (2 * maxMovement + 1) - maxMovement),
  //       y:
  //         prevState.y +
  //         Math.floor(Math.random() * (2 * maxMovement + 1) - maxMovement),
  //     }));
  //     ctxRef.current.clearRect(
  //       botThreeCords.x,
  //       botThreeCords.y,
  //       spriteWidth,
  //       spriteHeight
  //     );
  //     // Draw bot1 at its new position
  //     ctxRef.current.drawImage(
  //       bot3,
  //       botThreeCords.x,
  //       botThreeCords.y,
  //       spriteWidth,
  //       spriteHeight
  //     );
  //   }, 1000);
  //   return () => {
  //     clearInterval(moveBotsIntervalRef.current);
  //   };
  // }, [spriteX]);

  return (
    <div className="w-full">
      <div className="relative justify-center flex flex-center items-center">
        <canvas
          // bg-chessTexture bg-center
          className="bg-neutral-900 rounded border-white border-2"
          ref={canvasRef}
          width={canvasWidth}
          height={canvasHeight}
        />
      </div>
    </div>
  );
}

export default Bots;
