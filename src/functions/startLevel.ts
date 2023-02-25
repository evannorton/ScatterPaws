import unitsPerTile from "../constants/unitsPerTile";
import state from "../state";
import calculateActiveDestructibles from "./calculateActiveDestructibles";

const startLevel = (): void => {
  state.playedDefeatMusic = false;
  state.playedLevelMusic = false;
  state.isInBed = true;
  state.levelStartedAt = null;
  state.brokenDestructibleIDs = [];
  state.activeDestructibleIDs = [];
  state.hitObstacleAt = null;
  state.cootsVelocityX = 0;
  state.cootsVelocityY = 0;
  state.cootsCoords = {
    x: state.level.startingTileX * unitsPerTile,
    y: state.level.startingTileY * unitsPerTile
  };
  state.recentDestruction = null;
  calculateActiveDestructibles();
};

export default startLevel;