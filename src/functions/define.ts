import ImageSource from "../classes/ImageSource";
import Tilemap from "../classes/Tilemap";
import Tileset from "../classes/Tileset";
import map from "../tilemaps/map.json";
import floors from "../tilesets/floors.json";
import walls from "../tilesets/walls.json";

const define = (): void => {
  new Tilemap("map", map)
  new ImageSource("coots");
  new Tileset("floors", floors);
  new Tileset("walls", walls);
  new ImageSource("tilesets/floors");
  new ImageSource("tilesets/walls");
};

export default define;