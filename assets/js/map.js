const TILE_SIZE = 32;

const map1Image = new Image();
map1Image.src = 'assets/map/room_map 1.2.png';

const map1UpperImage = new Image();
map1UpperImage.src = 'assets/map/room_map upper 1.2.png';

const map2Image = new Image();
map2Image.src = 'assets/map/city_map 1.3.png';

const map2UpperImage = new Image();
map2UpperImage.src = 'assets/map/city_map upper 1.3.png';

let mapsLoaded = {
  map1: false,
  map1Upper: false,
  map2: false,
  map2Upper: false
};

map1Image.onload = () => mapsLoaded.map1 = true;
map1UpperImage.onload = () => mapsLoaded.map1Upper = true;
map2Image.onload = () => mapsLoaded.map2 = true;
map2UpperImage.onload = () => mapsLoaded.map2Upper = true;

export let currentMap = 1;
export function setCurrentMap(id) {
  currentMap = id;
}

const teleportTiles = {
  1: [ { x: 12, y: 16 }, { x: 13, y: 16 }, { x: 14, y: 16 } ],
  2: [ { x: 11, y: 6 } ]
};

const blockedTiles = {
  1: [
    { x: 23, y: 13 }, { x: 23, y: 12 }, { x: 23, y: 14 }, { x: 23, y: 11 }, 
    { x: 23, y: 10 }, { x: 23, y: 9 }, { x: 23, y: 8 }, { x: 23, y: 7 }, 
    { x: 23, y: 6 }, { x: 23, y: 5 }, { x: 22, y: 5 }, { x: 21, y: 5 }, 
    { x: 20, y: 5 }, { x: 19, y: 5 }, { x: 18, y: 4 },  { x: 17, y: 4 }, 
    { x: 16, y: 4 }, { x: 15, y: 4 }, { x: 14, y: 4 },  { x: 13, y: 4 }, 
    { x: 12, y: 4 },  { x: 11, y: 4 }, { x: 10, y: 5 }, { x: 9, y: 5 }, 
    { x: 8, y: 5 }, { x: 7, y: 5 }, { x: 6, y: 5 }, { x: 5, y: 4 }, { x: 4, y: 4 }, 
    { x: 3, y: 4 }, { x: 3, y: 5 }, { x: 3, y: 6 }, { x: 3, y: 7 }, { x: 3, y: 8 }, 
    { x: 3, y: 9 }, { x: 3, y: 10 }, { x: 3, y: 11 }, { x: 3, y: 12 }, { x: 3, y: 13 }, 
    { x: 3, y: 14 }, { x: 4, y: 14 }, { x: 5, y: 14 }, { x: 6, y: 14 }, { x: 7, y: 14 }, 
    { x: 8, y: 14 }, { x: 9, y: 14 }, { x: 10, y: 14 }, { x: 11, y: 14 }, { x: 15, y: 14 }, 
    { x: 16, y: 14 }, { x: 17, y: 14 }, { x: 18, y: 14 }, { x: 19, y: 14 }, { x: 20, y: 14 }, 
     { x: 21, y: 14 }, { x: 22, y: 14 }, { x: 22, y: 15 }, { x: 21, y: 15 }, { x: 20, y: 15 }, 
     { x: 19, y: 15 }, { x: 18, y: 15 }, { x: 17, y: 15 }, { x: 16, y: 15 }, { x: 15, y: 15 }, 
     { x: 11, y: 15 }, { x: 10, y: 15 }, { x: 9, y: 15 }, { x: 8, y: 15 }, { x: 7, y: 15 }, { x: 6, y: 15 },  
     { x: 5, y: 15 }, { x: 4, y: 15 }, { x: 3, y: 15 }, { x: 13, y: 8 }, { x: 14, y: 8 }, { x: 15, y: 8 }, 
  ],
  2: [
    { x: 1, y: 0 }, { x: 2, y: 0 }, { x: 3, y: 0 }, { x: 4, y: 0 }, { x: 5, y: 0 }, { x: 6, y: 0 },
    { x: 7, y: 0 }, { x: 8, y: 0 }, { x: 9, y: 0 }, { x: 10, y: 0 }, { x: 11, y: 0 }, { x: 12, y: 0 },
    { x: 13, y: 0}, { x: 14, y: 0 }, { x: 15, y: 0 }, { x: 16, y: 0 }, { x: 17, y: 0 }, { x: 18, y: 0 },
    { x: 19, y: 0 }, { x: 20, y: 0 }, { x: 21, y: 0 }, { x: 22, y: 0 }, { x: 23, y: 0 }, { x: 24, y: 0 }, { x: 24, y: 1 },
    { x: 24, y: 2 }, { x: 24, y: 3 }, { x: 24, y: 4 }, { x: 24, y: 5 }, { x: 24, y: 6 }, { x: 24, y: 7 },
    { x: 24, y: 8 }, { x: 24, y: 9 }, { x: 24, y: 10 }, { x: 24, y: 11 }, { x: 24, y: 12 }, { x: 24, y: 13 },
    { x: 24, y: 14 }, { x: 24, y: 15 }, { x: 24, y: 16 }, { x: 24, y: 17 }, { x: 24, y: 18 }, { x: 24, y: 19 },
    { x: 24, y: 20 }, { x: 24, y: 21 }, { x: 23, y: 21 }, { x: 22, y: 21 }, { x: 21, y: 21 }, { x: 20, y: 21 },
    { x: 19, y: 21 }, { x: 18, y: 21 }, { x: 17, y: 21 }, { x: 16, y: 21 }, { x: 15, y: 21 }, { x: 14, y: 21 },
    { x: 13, y: 21 }, { x: 12, y: 21 }, { x: 11, y: 21 }, { x: 10, y: 21 }, { x: 9, y: 21 }, { x: 8, y: 21 },
    { x: 7, y: 21 }, { x: 6, y: 21 }, { x: 5, y: 21 }, { x: 4, y: 21 }, { x: 3, y: 21 }, { x: 2, y: 21 }, 
    { x: 1, y: 21 }, { x: 0, y: 21 }, { x: 0, y: 20 }, { x: 0, y: 19 }, { x: 0, y: 18 }, { x: 0, y: 17 }, { x: 0, y: 16 },
    { x: 0, y: 15 }, { x: 0, y: 14 }, { x: 0, y: 13 }, { x: 0, y: 12 }, { x: 0, y: 11 }, { x: 0, y: 10 },
    { x: 0, y: 9 }, { x: 0, y: 8 }, { x: 0, y: 7 }, { x: 0, y: 6 }, { x: 0, y: 5 }, { x: 0, y: 4 },
    { x: 0, y: 3 }, { x: 0, y: 2 }, { x: 0, y: 1 }, { x: 0, y: 0 }, { x: 9, y: 7 }, { x: 10, y: 7 },
    { x: 9, y: 6 }, { x: 10, y: 6 }, { x: 9, y: 5 }, { x: 10, y: 5 }, { x: 11, y: 5 }, { x: 12, y: 5 }, 
    { x: 12, y: 6 }, { x: 13, y: 6 }, { x: 14, y: 6 }, { x: 15, y: 6 }, { x: 15, y: 5 }, 
    { x: 12, y: 7 }, { x: 13, y: 7 }, { x: 14, y: 7 }, { x: 15, y: 7 }, { x: 5, y: 17 }, { x: 5, y: 16 }, 
    { x: 5, y: 15 }, { x: 6, y: 16 }, { x: 7, y: 16 }, { x: 8, y: 16 }, { x: 9, y: 16 }, { x: 10, y: 16 }, 
    { x: 10, y: 17 }, { x: 14, y: 17 }, { x: 15, y: 17 }, { x: 16, y: 17 }, { x: 17, y: 17 }, { x: 18, y: 17 }, { x: 19, y: 17 }, { x: 19, y: 16 }, 
    { x: 19, y: 15 }, { x: 18, y: 15 }, { x: 17, y: 15 }, { x: 16, y: 15 }, { x: 15, y: 15 },  { x: 14, y: 15 }, { x: 14, y: 16 },
  ]
};

export function isBlocked(tileX, tileY) {
  const tiles = blockedTiles[currentMap] || [];
  return tiles.some(tile => tile.x === tileX && tile.y === tileY);
}

export function drawMap(ctx) {
  if (currentMap === 1 && mapsLoaded.map1) {
    ctx.drawImage(map1Image, 0, 0);
  } else if (currentMap === 2 && mapsLoaded.map2) {
    ctx.drawImage(map2Image, 0, 0);
  }
}

export function drawMapUpper(ctx) {
  if (currentMap === 1 && mapsLoaded.map1Upper) {
    ctx.drawImage(map1UpperImage, 0, 0);
  } else if (currentMap === 2 && mapsLoaded.map2Upper) {
    ctx.drawImage(map2UpperImage, 0, 0);
  }
}

export function drawBlockedTiles(ctx) {
  const tiles = blockedTiles[currentMap] || [];

  ctx.save();
  ctx.fillStyle = 'rgba(255, 0, 0, 0.4)'; 

  for (const tile of tiles) {
    ctx.fillRect(tile.x * TILE_SIZE, tile.y * TILE_SIZE, TILE_SIZE, TILE_SIZE);
  }

  ctx.restore();
}

export function checkTeleportTile(xPos, yPos) {
  const tileX = Math.floor(xPos / TILE_SIZE);
  const tileY = Math.floor(yPos / TILE_SIZE);

  const teleports = teleportTiles[currentMap] || [];

  for (const tile of teleports) {
    if (tile.x === tileX && tile.y === tileY) {
      setCurrentMap(currentMap === 1 ? 2 : 1);
      return true;
    }
  }

  return false;
}



export { TILE_SIZE };
