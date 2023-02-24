import Level from "../interfaces/Level";

const levels: Level[] = [
  {
    requiredDestructibles: 5,
    startingTileX: 7,
    startingTileY: 17,
    tilemapSlug: "map",
    time: 60000
  },
  {
    requiredDestructibles: 13,
    startingTileX: -10,
    startingTileY: 36,
    tilemapSlug: "map-2",
    time: 120000
  },
  // {
  //   requiredDestructibles: 20,
  //   startingTileX: 32,
  //   startingTileY: 24,
  //   tilemapSlug: "map-3",
  //   time: 120000
  // }
];

export default levels;