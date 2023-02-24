import unitsPerTile from "../constants/unitsPerTile";
import state from "../state";
import calculateActiveDestructibles from "./calculateActiveDestructibles";
import getAudioSource from "./definables/getAudioSource";

const startLevel = (): void => {
  state.levelStartedAt = state.currentTime;
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
  getAudioSource("noises/meow").play(null, null);
};

export default startLevel;