import getDefinables from "./getDefinables";

const getDefinablesCount = (className: string): number => getDefinables(className).size;

export default getDefinablesCount;