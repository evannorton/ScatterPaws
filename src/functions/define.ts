import ImageSource from "../classes/ImageSource";
import Tilemap from "../classes/Tilemap";
import Tileset from "../classes/Tileset";
import map from "../tilemaps/map.json";
import floors from "../tilesets/floors.json";
import walls from "../tilesets/walls.json";
import furniture from "../tilesets/furniture.json";
import collision from "../tilesets/collision.json";
import AudioSource from "../classes/AudioSource";

const define = (): void => {
  new Tilemap("map", map)
  new ImageSource("coots");
  new Tileset("floors", floors);
  new Tileset("walls", walls);
  new Tileset("furniture", furniture);
  new Tileset("collision", collision);
  new ImageSource("tilesets/floors");
  new ImageSource("tilesets/walls");
  new ImageSource("tilesets/furniture");
  new ImageSource("tilesets/collision");
  new ImageSource("indicator");
  new ImageSource("interact-hud");
  new AudioSource("music/music");
};

export default define;