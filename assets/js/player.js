import { isBlocked } from './map.js'; 

const TILE_SIZE = 32;

const SPRITE_WIDTH = 180;
const SPRITE_HEIGHT = 220;

const PLAYER_WIDTH = 48;
const PLAYER_HEIGHT = 64;

const playerImage = new Image();
playerImage.src = 'assets/characters/hero.png';

let frameX = 0; 
let frameY = 0;

const frameCount = 3; 
let frameTimer = 0;
const frameInterval = 10;

const player = {
  x: TILE_SIZE * 13.8,
  y: TILE_SIZE * 5.3,
  speed: 2,
  moving: false,
  direction: 'down'
};

function updatePlayer(keys) {
  player.moving = false;

  const tileX = Math.floor(player.x / TILE_SIZE);
  const tileY = Math.floor(player.y / TILE_SIZE);

  if (keys['ArrowUp']) {
    const newTileY = Math.floor((player.y - player.speed) / TILE_SIZE);
    if (!isBlocked(tileX, newTileY)) {
      player.y -= player.speed;
      player.direction = 'up';
      player.moving = true;
    }
  } else if (keys['ArrowDown']) {
    const newTileY = Math.floor((player.y + player.speed + PLAYER_HEIGHT - 1) / TILE_SIZE);
    if (!isBlocked(tileX, newTileY)) {
      player.y += player.speed;
      player.direction = 'down';
      player.moving = true;
    }
  } else if (keys['ArrowLeft']) {
    const newTileX = Math.floor((player.x - player.speed) / TILE_SIZE);
    if (!isBlocked(newTileX, tileY)) {
      player.x -= player.speed;
      player.direction = 'left';
      player.moving = true;
    }
  } else if (keys['ArrowRight']) {
    const newTileX = Math.floor((player.x + player.speed + PLAYER_WIDTH - 1) / TILE_SIZE);
    if (!isBlocked(newTileX, tileY)) {
      player.x += player.speed;
      player.direction = 'right';
      player.moving = true;
    }
  }

  switch (player.direction) {
    case 'down': frameY = 0; break;
    case 'left': frameY = 1; break;
    case 'right': frameY = 2; break;
    case 'up': frameY = 3; break;
  }

  if (player.moving) {
    frameTimer++;
    if (frameTimer >= frameInterval) {
      frameX = (frameX + 1) % frameCount;
      frameTimer = 0;
    }
  } else {
    frameX = 0;
  }
}


function drawPlayer(ctx) {
  ctx.drawImage(
    playerImage,
    frameX * SPRITE_WIDTH,
    frameY * SPRITE_HEIGHT,
    SPRITE_WIDTH,
    SPRITE_HEIGHT,
    player.x,
    player.y,
    PLAYER_WIDTH,
    PLAYER_HEIGHT
  );
}

export { player, playerImage, updatePlayer, drawPlayer };
