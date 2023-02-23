
import calculateActiveDestructibles from "./calculateActiveDestructibles";
import levels from "../constants/levels";
import getTilemap from "./definables/getTilemap";
import gameIsOngoing from "./gameIsOngoing";
import isClawOnCooldown from "./isClawOnCooldown";
import getAudioSource from "./definables/getAudioSource";
import state from "../state";
import startLevel from "./startLevel";

const attemptScratch = (): void => {
  if (gameIsOngoing()) {
    const cooldown: boolean = isClawOnCooldown();
    if (cooldown === false) {
      getAudioSource("noises/scratch").play(null, null);
      state.clawedAt = state.currentTime;
      const destructibleID: string | null = getTilemap(state.level.tilemapSlug).getDestructibleIDWithinRange();
      if (destructibleID !== null) {
        const brokenDestructibles: string[] = state.brokenDestructibles;
        if (brokenDestructibles.includes(destructibleID) === false && state.activeDestructibles.includes(destructibleID)) {
          state.brokenDestructibles = [...brokenDestructibles, destructibleID];
          state.activeDestructibles = state.activeDestructibles.filter((activeDestructible) => activeDestructible !== destructibleID);
          calculateActiveDestructibles();
          if (state.activeDestructibles.length === 0) {
            const levelIndex = levels.findIndex((level) => level === state.level);
            const newLevel = levels[levelIndex + 1];
            if (newLevel) {
              state.level = newLevel;
              startLevel();
            }
            else {
              state.won = true;
            }
          }
        }
      }
    }
  }
};

export default attemptScratch;