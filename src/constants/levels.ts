import Level from "../interfaces/Level";

const levels: Level[] = [
  {
    bed: 0,
    requiredDestructibles: 5,
    startingTileX: 8,
    startingTileY: 18,
    tilemapSlug: "map",
    time: 90000
  },
  {
    bed: 1,
    requiredDestructibles: 15,
    startingTileX: -15,
    startingTileY: 41,
    tilemapSlug: "map-2",
    time: 120000
  },
  {
    bed: 2,
    requiredDestructibles: 20,
    startingTileX: 54,
    startingTileY: -2,
    tilemapSlug: "map-3",
    time: 150000
  },
];

export default levels;