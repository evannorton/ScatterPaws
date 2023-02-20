import ZIndexType from "../../enums/ZIndexType";
import ZIndex from "./ZIndex";

interface YSortZIndex extends ZIndex {
  readonly ySortID: string;
  readonly type: ZIndexType.YSort;
}

export default YSortZIndex;