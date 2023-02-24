import ludwigTheming from "../constants/ludwigTheming";
import drawRectangle from "./draw/drawRectangle";
import drawText from "./draw/drawText";

const drawTutorialHUD = (): void => {
  const width: number = ludwigTheming ? 224 : 218;
  drawRectangle("#000000", .25, 4, 4, width, 63, 10003);
  drawText(`${ludwigTheming ? "Coots" : "Kitty"} wants food! Guide her to cause a ruckus and get ${ludwigTheming ? "Ludwig" : "owner"}'s attention!`, "#ffffff", 6, 6, 1, width - 4, 10, "left", "top");
  drawText("- Mouse to move. Avoid cat toys!", "#ffffff", 6, 30, 1, width - 4, 2, "left", "top");
  drawText("- Click/space to claw objects.", "#ffffff", 6, 43, 1, width - 4, 2, "left", "top");
  drawText("- M to meow.", "#ffffff", 6, 56, 1, width - 4, 2, "left", "top");
};

export default drawTutorialHUD;