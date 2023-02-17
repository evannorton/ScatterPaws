import Tilemap from "../../classes/Tilemap";
import getDefinable from "./getDefinable";

const getTilemap = (slug: string): Tilemap => getDefinable({
  className: "Tilemap",
  slug
}) as Tilemap;

export default getTilemap;