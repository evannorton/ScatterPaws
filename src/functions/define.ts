import ImageSource from "../classes/ImageSource";
import Tilemap from "../classes/Tilemap";
import Tileset from "../classes/Tileset";
import map from "../tilemaps/map.json";
import floors from "../tilesets/floors.json";
import walls from "../tilesets/walls.json";
import collidables from "../tilesets/collidables.json";

const define = (): void => {
  new Tilemap("map", map)
  new ImageSource("coots");
  new Tileset("floors", floors);
  new Tileset("walls", walls);
  new Tileset("collidables", collidables);
  new ImageSource("tilesets/floors");
  new ImageSource("tilesets/walls");
  new ImageSource("tilesets/collidables");
};

export default define;