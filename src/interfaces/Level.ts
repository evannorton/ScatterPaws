interface Level {
  readonly requiredDestructibles: number;
  readonly startingTileX: number;
  readonly startingTileY: number;
  readonly tilemapSlug: string;
  readonly time: number;
}

export default Level;