import ImageSource from "../classes/ImageSource";
import Tilemap from "../classes/Tilemap";
import Tileset from "../classes/Tileset";
import map from "../tilemaps/map.json";
import tiles from "../tilesets/tiles.json";

const define = (): void => {
  new Tileset("tiles", tiles);
  new Tilemap("map", map)
  new ImageSource("coots");
  new ImageSource("tilesets/tiles");
};

export default define;