import ImageSource from "../classes/ImageSource";
import Tilemap from "../classes/Tilemap";
import Tileset from "../classes/Tileset";
import map from "../tilemaps/map.json";
import map2 from "../tilemaps/map-2.json";
import map3 from "../tilemaps/map-3.json";
import floors from "../tilesets/floors.json";
import walls from "../tilesets/walls.json";
import furniture from "../tilesets/furniture.json";
import collision from "../tilesets/collision.json";
import obstacles from "../tilesets/obstacles.json";
import AudioSource from "../classes/AudioSource";

const define = (): void => {
  new Tilemap("map", map)
  new Tilemap("map-2", map2)
  new Tilemap("map-3", map3)
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
  new ImageSource("buttons/play");
  new ImageSource("buttons/next");
  new ImageSource("hunger");
  new ImageSource("eating");
  new AudioSource("music/title", true, 132000);
  new AudioSource("music/main", false, 132000);
  new AudioSource("noises/scratch", false, null);
  new AudioSource("noises/meow", false, null);
  new AudioSource("noises/destroy/electronic", false, null);
};

export default define;