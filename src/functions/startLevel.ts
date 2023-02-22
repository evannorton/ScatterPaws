import unitsPerTile from "../constants/unitsPerTile";
import state from "../state";
import calculateActiveDestructibles from "./calculateActiveDestructibles";

const startLevel = (): void => {
  state.levelStartedAt = state.currentTime;
  state.brokenDestructibles = [];
  state.activeDestructibles = [];
  state.hitObstacleAt = null;
  state.cootsVelocityX = 0;
  state.cootsVelocityY = 0;
  state.cootsCoords = {
    x: state.level.startingTileX * unitsPerTile,
    y: state.level.startingTileY * unitsPerTile
  };
  calculateActiveDestructibles();
};

export default startLevel;