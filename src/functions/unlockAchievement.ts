import state from "../state";

const unlockAchievement = (medalID: number): void => {
  console.log(`unlock achievement: ${medalID}`);
  if (state.achievements.includes(medalID) === false && window.ngio.user !== null) {
    state.achievements.push(medalID);
    window.ngio.callComponent("Achievement.unlock", { id: medalID });
  }
};

export default unlockAchievement;