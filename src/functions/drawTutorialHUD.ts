import ludwigTheming from "../constants/ludwigTheming";
import drawRectangle from "./draw/drawRectangle";
import drawText from "./draw/drawText";

const drawTutorialHUD = (): void => {
  const width: number = ludwigTheming ? 224 : 218;
  const x: number = 20;
  drawRectangle("#000000", .25, x - 2, 4, width, 63, 10003);
  drawText(`${ludwigTheming ? "Coots" : "Kitty"} wants food! Guide her to wreak havoc and get ${ludwigTheming ? "Ludwig" : "owner"}'s attention!`, "#ffffff", x, 6, 1, width - 4, 10, "left", "top");
  drawText("- Mouse to move. Avoid cat toys!", "#ffffff", x, 30, 1, width - 4, 2, "left", "top");
  drawText("- Click/space to claw objects.", "#ffffff", x, 43, 1, width - 4, 2, "left", "top");
  drawText("- M to meow.", "#ffffff", x, 56, 1, width - 4, 2, "left", "top");
};

export default drawTutorialHUD;