import state from "../state";
import isCatStarving from "./isCatStarving";

const gameIsOngoing = (): boolean => state.isAtTitle === false && isCatStarving() === false && state.won === false;

export default gameIsOngoing;