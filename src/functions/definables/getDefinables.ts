import Definable from "../../classes/Definable";
import definables from "../../maps/definables";

const getDefinables = (className: string): Map<string, Definable> => {
  const map: Map<string, Definable> | undefined = definables.get(className);
  if (typeof map !== "undefined") {
    return map;
  }
  return new Map;
};

export default getDefinables;