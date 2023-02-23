import state from "../state";
import isCatStarving from "./isCatStarving";

const gameIsOngoing = (): boolean => isCatStarving() === false && state.won === false;

export default gameIsOngoing;