import ZIndexType from "../../enums/ZIndexType";
import ZIndex from "./ZIndex";

interface HardZIndex extends ZIndex {
  readonly value: number;
  readonly type: ZIndexType.Hard;
}

export default HardZIndex;