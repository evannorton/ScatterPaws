import { Graphics } from "pixi.js";
import state from "../../state";

const drawRectangle = (color: string, x: number, y: number, width: number, height: number): void => {
  const rectangle: Graphics = new Graphics;
  rectangle.beginFill(Number(`0x${color.substring(1)}`));
  rectangle.lineStyle(0, Number(`0x${color.substring(1)}`));
  rectangle.drawRect(x, y, width, height);
  state.app.stage.addChild(rectangle);
};

export default drawRectangle;