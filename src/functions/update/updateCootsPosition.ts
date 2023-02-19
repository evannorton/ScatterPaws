import unitsPerTile from "../../constants/unitsPerTile";
import state from "../../state";

const updateCootsPosition = (): void => {
  const x: number = state.cootsCoords.x + Math.floor(state.cootsVelocityX * (state.app.ticker.deltaMS / 1000));
  const y: number = state.cootsCoords.y + Math.floor(state.cootsVelocityY * (state.app.ticker.deltaMS / 1000));
  const xCollision: number = x > state.cootsCoords.x ? Math.floor(x + unitsPerTile * .9) : x;
  const yCollision: number = y > state.cootsCoords.y ? Math.floor(y + unitsPerTile * .9) : y;
  if (state.tilemap.hasCollisionAtCoords({ x: xCollision, y: state.cootsCoords.y })) {
    state.cootsVelocityX *= -1;
  }
  else if (state.tilemap.hasCollisionAtCoords({ x: state.cootsCoords.x, y: yCollision, })) {
    state.cootsVelocityY *= -1;
  }
  else if (state.tilemap.hasCollisionAtCoords({ x: xCollision, y: yCollision })) {
    state.cootsVelocityX *= -1;
    state.cootsVelocityY *= -1;
  }
  else {
    state.cootsCoords = { x, y };
  }
};

export default updateCootsPosition;