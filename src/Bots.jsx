import React, { useState, useEffect, useRef } from "react";
import doux from "./assets/sheets/doux.png";
import tard from "./assets/sheets/tard.png";
import mort from "./assets/sheets/mort.png";
import vita from "./assets/sheets/vita.png";
import tardMirror from "./assets/sheets/tardMirror.png";
import shadowBox from "./assets/misc/shadow_2.png";
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
} from "./canvasVariables";
function Bots(props) {
  let { username } = props;
  const [frame, setFrame] = useState(0);
  const [spriteX, setSpriteX] = useState(300);
  const [spriteY, setSpriteY] = useState(300);
  const [botOneCords, setBotOneCords] = useState({ x: 300, y: 300 });
  const [botTwoCords, setBotTwoCords] = useState({ x: 300, y: 300 });
  const [botThreeCords, setBotThreeCords] = useState({ x: 300, y: 300 });
  const [direction, setDirection] = useState("right");
  const [size, setSize] = useState("small");
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
  let canvasWidth = 900;
  let canvasHeight = 900;
  const spriteWidth = 48;
  const spriteHeight = 40;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    if (window.innerWidth < 899) {
      canvasHeight = 300;
      canvasWidth = 300;
      canvas.height = 300;
      canvas.width = 300;
      setSize("small");
      setBotOneCords({ x: 150, y: 150 });
      setSpriteX(150);
      setSpriteY(150);
      setBotTwoCords({ x: 150, y: 150 });
      setBotThreeCords({ x: 150, y: 150 });
    } else {
      canvas.height = 900;
      canvas.width = 900;
      canvasHeight = 900;
      canvasWidth = 900;
      setSize("large");
    }
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
    let shapeSizes;
    const shapes = [redRect, blueRect, greenRect, orangeRect, circle];
    const smallShapes = [
      redSmallRect,
      blueSmallRect,
      greenSmallRect,
      orangeSmallRect,
      smallCircle,
    ];
    if (size === "small") {
      shapeSizes = smallShapes;
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
    } else {
      wrapText(ctx, text, midPoint, 450, maxWidth, lineHeight);
    }
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
    ctx.font = "20px LemonMilk";
    ctx.fillText(username, spriteX + 24, spriteY - 8);
    ctx.save();
    if (direction === "right") {
      // ctx.scale(2, 2);
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
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctxRef.current = ctx;
    if (window.innerWidth < 899 || window.innerHeight < 899) {
      canvasHeight = 300;
      canvasWidth = 300;
    } else {
      canvasHeight = 900;
      canvasWidth = 900;
    }
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
