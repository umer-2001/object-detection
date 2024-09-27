export function renderObjectPositions(ctx, objects) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  const font = "16px sans-serif";
  ctx.font = font;
  ctx.textBaseline = "top";
  objects?.forEach((o) => {
    const [x, y, width, height] = o["bbox"];

    const isPerson = o.class === "person";
    // box

    // const objectColor = getColorForObjectClass(o.class);

    ctx.strokeStyle = isPerson ? "#ff0000" : "#00ffff";
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);

    // fill color
    ctx.fillStyle = `rgba(255,0,0,${isPerson ? 0.2 : 0})`;
    ctx.fillRect(x, y, width, height);
    // Draw label

    ctx.fillStyle = isPerson ? "#ff0000" : "#00ffff";
    const textWidth = ctx.measureText(o.class).width;
    const textHeight = parseInt(font, 10);
    ctx.fillRect(x, y, textWidth + 4, textHeight + 4);

    ctx.fillStyle = "#000000";
    ctx.fillText(o.class, x, y);
  });
}
export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
const getColorForObjectClass = (objectClass) => {
  if (!colorMap[objectClass]) {
    colorMap[objectClass] = getRandomColor();
  }
  return colorMap[objectClass];
};
