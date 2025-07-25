import { drawMap, drawMapUpper, checkTeleportTile, setCurrentMap, currentMap, drawBlockedTiles } from './map.js';
import { player, updatePlayer, drawPlayer } from './player.js';
import { checkObservationTile, drawObservationBox, handleObservationZ } from './observations.js';

const TILE_SIZE = 32;
const GAME_WIDTH = TILE_SIZE * 25; 
const GAME_HEIGHT = TILE_SIZE * 22; 

const canvas = document.getElementById('canvas1');
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;
const ctx = canvas.getContext('2d');

let ZOOM = 1.2; 
const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 0.25;

const keys = {};


window.addEventListener('keydown', (e) => {
  keys[e.key] = true;

  if (e.key === 'z' || e.key === 'Z') {
    handleObservationZ();
  }

  if (e.key === '+' || e.key === '=') {
    ZOOM = Math.min(ZOOM + ZOOM_STEP, ZOOM_MAX);
  }

  if (e.key === '-' || e.key === '_') {
    ZOOM = Math.max(ZOOM - ZOOM_STEP, ZOOM_MIN);
  }
});

window.addEventListener('keyup', (e) => {
  keys[e.key] = false;
});


const spawnPoints = {
  1: { x: 13 * TILE_SIZE, y: 15 * TILE_SIZE },
  2: { x: 11 * TILE_SIZE, y: 7 * TILE_SIZE }
};

function gameLoop() {

  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  ctx.save();
  ctx.scale(ZOOM, ZOOM);

  const cameraX = player.x - GAME_WIDTH / (2 * ZOOM);
  const cameraY = player.y - GAME_HEIGHT / (2 * ZOOM);
  ctx.translate(-cameraX, -cameraY);

  drawMap(ctx);
  //drawBlockedTiles(ctx);
  updatePlayer(keys);
  checkObservationTile(player.x, player.y);
  drawPlayer(ctx);

  if (checkTeleportTile(player.x, player.y)) {
    const destination = spawnPoints[currentMap];
    if (destination) {
      player.x = destination.x;
      player.y = destination.y;
    }
  }

  drawMapUpper(ctx);
  ctx.restore();

  drawObservationBox(ctx, canvas.width, canvas.height);

  requestAnimationFrame(gameLoop);
}

gameLoop();
