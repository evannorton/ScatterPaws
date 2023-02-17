import Tileset from "../../classes/Tileset";
import getDefinable from "./getDefinable";

const getTileset = (slug: string): Tileset => getDefinable({
  className: "Tileset",
  slug
}) as Tileset;

export default getTileset;