import state from "../../state";

const updateCootsPosition = (): void => {
  const x: number = state.cootsCoords.x + Math.floor(state.cootsVelocityX * (state.app.ticker.deltaMS / 1000));
  const y: number = state.cootsCoords.y + Math.floor(state.cootsVelocityY * (state.app.ticker.deltaMS / 1000));
  if (state.tilemap.hasCollisionAtCoords({ x, y: state.cootsCoords.y })) {
    state.cootsVelocityX *= -1;
  }
  else if (state.tilemap.hasCollisionAtCoords({ x: state.cootsCoords.y, y, })) {
    state.cootsVelocityY *= -1;
  }
  else if (state.tilemap.hasCollisionAtCoords({ x, y })) {
    state.cootsVelocityX *= -1;
    state.cootsVelocityY *= -1;
  }
  else {
    state.cootsCoords = { x, y };
  }
};

export default updateCootsPosition;