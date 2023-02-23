
import calculateActiveDestructibles from "./calculateActiveDestructibles";
import getTilemap from "./definables/getTilemap";
import gameIsOngoing from "./gameIsOngoing";
import isClawOnCooldown from "./isClawOnCooldown";
import getAudioSource from "./definables/getAudioSource";
import state from "../state";
import Destructible from "../interfaces/Destructible";
import isCootsInObstacle from "./isCootsInObstacle";

const attemptScratch = (): void => {
  if (gameIsOngoing() && isCootsInObstacle() === false && state.activeDestructibleIDs.length > 0) {
    const cooldown: boolean = isClawOnCooldown();
    if (cooldown === false) {
      const clawedAt = state.currentTime;
      const destructible: Destructible | null = getTilemap(state.level.tilemapSlug).getDestructibleWithinRange();
      const willDestroy = destructible !== null && state.brokenDestructibleIDs.includes(destructible.destructibleID) === false && state.activeDestructibleIDs.includes(destructible.destructibleID);
      if (!willDestroy) {
        state.recentDestruction = {
          clawedAt,
          destructibleID: null,
          tileID: null
        };
        getAudioSource("noises/scratch").play(null, null, null);
      }
      else {
        state.recentDestruction = {
          clawedAt,
          destructibleID: destructible.destructibleID,
          tileID: destructible.tileID
        };
        getAudioSource("noises/scratch").play(null, null, () => {
          if (destructible.audioSourceSlug) {
            getAudioSource(destructible.audioSourceSlug).play(null, null, null);
          }
        });
        const brokenDestructibleIDs: string[] = state.brokenDestructibleIDs;
        state.brokenDestructibleIDs = [...brokenDestructibleIDs, destructible.destructibleID];
        state.activeDestructibleIDs = state.activeDestructibleIDs.filter((activeDestructible) => activeDestructible !== destructible.destructibleID);
        calculateActiveDestructibles();
      }
    }
  }
};

export default attemptScratch;