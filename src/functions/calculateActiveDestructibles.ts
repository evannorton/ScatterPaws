import state from "../state";
import getUnbrokenDestructibles from "./getUnbrokenDestructibles";

const calculateActiveDestructibles = (): void => {
  const max: number = 2;
  const activeDestructibles = state.activeDestructibles;
  const diff: number = max - activeDestructibles.length;
  const destructibles: string[] = getUnbrokenDestructibles().filter((unbrokenDestructible) => activeDestructibles.includes(unbrokenDestructible) === false);
  for (let i: number = 0; i < diff; i++) {
    if (destructibles.length > 0) {
      const index = Math.floor(Math.random() * destructibles.length);
      const destructible = destructibles[index];
      activeDestructibles.push(destructible);
      destructibles.splice(index, 1);
    }
  }
  state.activeDestructibles = activeDestructibles;
}

export default calculateActiveDestructibles;