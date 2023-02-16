import cootsHeight from "../../constants/cootsHeight";
import cootsWidth from "../../constants/cootsWidth";
import state from "../../state";
import drawImage from "./drawImage";

const drawCoots = (): void => {
  drawImage("coots", 0, 0, cootsWidth, cootsHeight, state.cootsX, state.cootsY, cootsWidth, cootsHeight);
};

export default drawCoots;