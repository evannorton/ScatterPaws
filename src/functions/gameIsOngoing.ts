import state from "../state";
import isCatStarving from "./isCatStarving";

const gameIsOngoing = (): boolean => state.isAwaitingFocus === false && state.isAtTitle === false && isCatStarving() === false && state.won === false;

export default gameIsOngoing;