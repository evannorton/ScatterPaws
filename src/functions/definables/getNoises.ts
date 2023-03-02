import Definable from "../../classes/Definable";
import Noise from "../../classes/Noise";
import getDefinables from "./getDefinables";

const getNoises = (): Map<string, Noise> => {
  const noises: Map<string, Noise> = new Map;
  getDefinables("Noise").forEach((noise: Definable): void => {
    const slug: string = noise.slug;
    if (noise instanceof Noise) {
      noises.set(slug, noise);
    }
  });
  return noises;
};

export default getNoises;