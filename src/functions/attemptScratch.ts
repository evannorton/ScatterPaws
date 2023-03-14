
import calculateActiveDestructibles from "./calculateActiveDestructibles";
import getTilemap from "./definables/getTilemap";
import gameIsOngoing from "./gameIsOngoing";
import isClawOnCooldown from "./isClawOnCooldown";
import getAudioSource from "./definables/getAudioSource";
import state from "../state";
import Destructible from "../interfaces/Destructible";
import isCootsInObstacle from "./isCootsInObstacle";
import levelIsCompleted from "./levelIsCompleted";
import levels from "../constants/levels";
import unlockAchievement from "./unlockAchievement";
import getPausedTime from "./getPausedTime";
import cootsMaxVelocity from "../constants/cootsMaxVelocity";

const attemptScratch = (): void => {
  if (gameIsOngoing() && isCootsInObstacle() === false && levelIsCompleted() === false && state.isInBed === false) {
    const cooldown: boolean = isClawOnCooldown();
    if (cooldown === false) {
      const clawedAt = state.currentTime;
      const destructible: Destructible | null = getTilemap(state.level.tilemapSlug).getDestructibleWithinRange();
      const willDestroy = destructible !== null;
      if (!willDestroy) {
        state.recentDestruction = {
          clawedAt,
          destructibleID: null,
          tileID: null
        };
        getAudioSource("noises/scratch").play(null, null);
      }
      else {
        state.recentDestruction = {
          clawedAt,
          destructibleID: destructible.destructibleID,
          tileID: destructible.tileID
        };
        getAudioSource("noises/scratch").play(null, () => {
          if (destructible.audioSourceSlug) {
            getAudioSource(destructible.audioSourceSlug).play(null, null);
          }
        });
        if (state.cootsVelocityX === cootsMaxVelocity || state.cootsVelocityY === cootsMaxVelocity) {
          unlockAchievement(73079);
        }
        const brokenDestructibleIDs: string[] = state.brokenDestructibleIDs;
        state.brokenDestructibleIDs = [...brokenDestructibleIDs, destructible.destructibleID];
        state.activeDestructibleIDs = state.activeDestructibleIDs.filter((activeDestructible) => activeDestructible !== destructible.destructibleID);
        if (levelIsCompleted()) {
          state.levelCompletedAt = state.currentTime;
          const levelIndex = levels.findIndex((level) => level === state.level);
          if (state.hasHitObstacleAt() === false) {
            switch (levelIndex) {
              case 1:
                unlockAchievement(73075);
                break;
              case 2:
                unlockAchievement(73076);
                break;
            }
          }
          const endTime: number = levelIsCompleted() ? state.levelCompletedAt : state.currentTime;
          const timeLeft: number = state.level.time - (endTime - state.levelStartedAt) + getPausedTime();
          const secondsLeft: number = Math.floor(timeLeft / 1000);
          const percent: number = 1 - secondsLeft / state.level.time * 1000;
          const frame: number = percent < 1 / 3
            ? 0
            : percent < 2 / 3
              ? 1
              : 2;
          if (frame !== 2) {
            switch (levelIndex) {
              case 1:
                unlockAchievement(73077);
                break;
              case 2:
                unlockAchievement(73078);
                break;
            }
          }
        }
        calculateActiveDestructibles();
      }
    }
  }
};

export default attemptScratch;