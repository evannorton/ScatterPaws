import TilesetDataTile from "./TilesetDataTile";

interface TilesetData {
  readonly columns: number;
  readonly tileheight: number;
  readonly tiles?: TilesetDataTile[];
  readonly tilewidth: number;
}

export default TilesetData;