// function wrapText(ctx, text, x, textY, maxWidth, lineHeight) {
//   var words = text.split(" ");
//   var line = "";
//   for (var n = 0; n < words.length; n++) {
//     var testLine = line + words[n] + " ";
//     var metrics = ctx.measureText(testLine);
//     var testWidth = metrics.width;
//     if (testWidth > maxWidth && n > 0) {
//       ctx.fillText(line, x, textY);
//       line = words[n] + " ";
//       textY += lineHeight;
//     } else {
//       line = testLine;
//     }
//   }
//   ctx.fillText(line, x, textY);
// }
// var maxWidth = 400;
// var lineHeight = 24;
// var textY = canvasHeight;
// var text = `What is your favorite childhood memory?`;
// ctx.font = "20px Permanent Marker";
// ctx.fillStyle = "white";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
// var textLength = (text.length / 5) * 1.5;
// // 1 line = 5 words
// // 11px per line
// // every 5 words add 1 rem height
// wrapText(ctx, text, 500, textY / 2 - textLength, maxWidth, lineHeight);
export function wrapText(ctx, text, x, textY, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;
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

// Usage:
const maxWidth = 400;
const lineHeight = 24;
const textY = 1000;
const text = "What is your favorite childhood memory?";
// ctx.font = "20px Permanent Marker";
// ctx.fillStyle = "white";
// ctx.textAlign = "center";
// ctx.textBaseline = "middle";
const textLength = (text.length / 5) * 1.5;
// 1 line = 5 words
// 11px per line
// every 5 words add 1 rem height
// wrapText(ctx, text, 500, textY / 2 - textLength, maxWidth, lineHeight);
