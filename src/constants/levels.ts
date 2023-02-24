import Level from "../interfaces/Level";

const levels: Level[] = [
  {
    requiredDestructibles: 1,
    startingTileX: 6,
    startingTileY: 15,
    tilemapSlug: "map",
    time: 30000
  },
  {
    requiredDestructibles: 15,
    startingTileX: -10,
    startingTileY: 36,
    tilemapSlug: "map-2",
    time: 120000
  }
];

export default levels;