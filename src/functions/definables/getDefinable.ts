import Definable from "../../classes/Definable";
import DefinableReference from "../../interfaces/DefinableReference";
import getDefinables from "./getDefinables";

const getDefinable = ({ className, slug }: DefinableReference): Definable => {
  const definables: Map<string, Definable> = getDefinables(className);
  const entry: Definable | undefined = definables.get(slug);
  if (typeof entry !== "undefined") {
    return entry;
  }
  throw new Error(`${className} "${slug}" could not be found.`);
};

export default getDefinable;