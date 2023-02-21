import getTileset from "./definables/getTileset";

const getUnbrokenDestructibles = (): string[] => getTileset("furniture").getUnbrokenDestructibles();

export default getUnbrokenDestructibles;