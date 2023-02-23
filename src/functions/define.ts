import ImageSource from "../classes/ImageSource";
import Tilemap from "../classes/Tilemap";
import Tileset from "../classes/Tileset";
import map from "../tilemaps/map.json";
import map2 from "../tilemaps/map-2.json";
import floors from "../tilesets/floors.json";
import walls from "../tilesets/walls.json";
import furniture from "../tilesets/furniture.json";
import collision from "../tilesets/collision.json";
import obstacles from "../tilesets/obstacles.json";
import AudioSource from "../classes/AudioSource";

const define = (): void => {
  new Tilemap("map", map)
  new Tilemap("map-2", map2)
  new ImageSource("coots");
  new Tileset("floors", floors);
  new Tileset("walls", walls);
  new Tileset("furniture", furniture);
  new Tileset("collision", collision);
  new Tileset("obstacles", obstacles);
  new ImageSource("tilesets/floors");
  new ImageSource("tilesets/walls");
  new ImageSource("tilesets/furniture");
  new ImageSource("tilesets/collision");
  new ImageSource("tilesets/obstacles");
  new ImageSource("indicator");
  new ImageSource("interact-hud");
  new ImageSource("game-over");
  new ImageSource("victory");
  new ImageSource("scratch");
  new ImageSource("title");
  new ImageSource("pattern");
  new AudioSource("music/music");
  new AudioSource("noises/scratch");
  new AudioSource("noises/destroy/electronic");
};

export default define;