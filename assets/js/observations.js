import { TILE_SIZE, currentMap } from './map.js';

const observationTiles = {
  1: [
    {
      positions: [
        { x: 18, y: 6 },
        { x: 19, y: 6 },
        { x: 20, y: 6 }
      ],
      text: 'An old computer on a desk. Can it run Minecraft? Have you ever thought about using this computer to access www.youtube.com/Pedrinho8Bit?'
    },
    {
      positions: [
        { x: 6, y: 6 },
        { x: 7, y: 6 },
        { x: 8, y: 6 },
        { x: 9, y: 6 }
      ],
      text: 'Did you know that if all the hot dogs Americans eat in a year were lined up, a "bridge" could be built that would span twice the distance between the Earth and the Moon? Still want to read a book?'
    },
    {
      positions: [
        { x: 13, y: 5 },
        { x: 12, y: 5 },
        { x: 14, y: 5 }
      ],
      text: 'Dont you think its time to get out of bed?'
    }
  ],
  2: [
    {
      positions: [
        { x: 6, y: 18 },
        { x: 7, y: 18 }
      ],
      text: 'No one answers... Maria must have gone out...'
    },
    {
      positions: [
        { x: 16, y: 18 },
        { x: 17, y: 18 }
      ],
      text: 'John wont open the door for you! He hates you...'
    },
  ]
};


let currentObservation = null;
let observationVisible = false;
let textIndex = 0;
let typingSpeed = 1; 
let fullText = '';
let waitingForZ = false;

export function checkObservationTile(xPos, yPos) {
  const tileX = Math.floor(xPos / TILE_SIZE);
  const tileY = Math.floor(yPos / TILE_SIZE);

  const tiles = observationTiles[currentMap] || [];

  for (const tile of tiles) {
    for (const pos of tile.positions) {
      if (tileX === pos.x && tileY === pos.y) {
        if (!waitingForZ && currentObservation !== tile.text) {
          currentObservation = tile.text;
          waitingForZ = true;
          observationVisible = false;
        }
        return;
      }
    }
  }

  currentObservation = null;
  observationVisible = false;
  waitingForZ = false;
  textIndex = 0;
}

export function handleObservationZ() {
  if (waitingForZ && currentObservation) {
    fullText = currentObservation;
    observationVisible = true;
    waitingForZ = false;
    textIndex = 0;
  } else if (observationVisible) {
    if (textIndex < fullText.length) {
      textIndex = fullText.length;
    } else {
      observationVisible = false;
      currentObservation = null;
    }
  }
}

const textYOffset = 10;

export function drawObservationBox(ctx, canvasWidth, canvasHeight) {
  if (!observationVisible || !fullText) return;

  const boxWidth = canvasWidth * 0.8;
  const x = (canvasWidth - boxWidth) / 2;
  const padding = 10;

  ctx.font = '50px Game Over';
  const lineHeight = 54;
  const maxTextWidth = boxWidth - 2 * padding;

  if (textIndex < fullText.length) {
    textIndex += typingSpeed;
  }
  const visibleText = fullText.substring(0, Math.floor(textIndex));

  const words = visibleText.split(' ');
  const lines = [];
  let currentLine = '';

  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine + words[i] + ' ';
    const testWidth = ctx.measureText(testLine).width;

    if (testWidth > maxTextWidth && currentLine !== '') {
      lines.push(currentLine);
      currentLine = words[i] + ' ';
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine !== '') lines.push(currentLine);

  const boxHeight = lines.length * lineHeight + textYOffset + padding;
  const y = canvasHeight - boxHeight - 20;

  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.fillRect(x, y, boxWidth, boxHeight);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, boxWidth, boxHeight);

  ctx.fillStyle = 'black';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';

  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(
      lines[i],
      x + padding,
      y + textYOffset + i * lineHeight
    );
  }
}
