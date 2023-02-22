import startingTileX from "../constants/startingTileX";
import startingTileY from "../constants/startingTileY";
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
    x: startingTileX * unitsPerTile,
    y: startingTileY * unitsPerTile
  };
  calculateActiveDestructibles();
};

export default startLevel;