import unitsPerTile from "../../constants/unitsPerTile";
import state from "../../state";

const updateCootsPosition = (): void => {
  const collisionVelocityFactor = -.75;
  const leftOffset: number = -.5;
  const topOffset: number = - .5;
  const bottomOffset: number = .85;
  const rightOffset: number = 1;
  const topLeftCoords = {
    x: state.cootsCoords.x + leftOffset * unitsPerTile,
    y: state.cootsCoords.y + topOffset * unitsPerTile
  };
  const topRightCoords = {
    x: topLeftCoords.x + rightOffset * unitsPerTile,
    y: topLeftCoords.y
  };
  const bottomLeftCoords = {
    x: topLeftCoords.x,
    y: topLeftCoords.y + bottomOffset * unitsPerTile
  };
  const bottomRightCoords = {
    x: topRightCoords.x,
    y: bottomLeftCoords.y
  };
  const newX: number = state.cootsCoords.x + Math.floor(state.cootsVelocityX * (state.app.ticker.deltaMS / 1000));
  const newY: number = state.cootsCoords.y + Math.floor(state.cootsVelocityY * (state.app.ticker.deltaMS / 1000));
  const newTopLeftCoords = {
    x: newX + leftOffset * unitsPerTile,
    y: newY + topOffset * unitsPerTile
  };
  const newTopRightCoords = {
    x: newTopLeftCoords.x + rightOffset * unitsPerTile,
    y: newTopLeftCoords.y
  };
  const newBottomLeftCoords = {
    x: newTopLeftCoords.x,
    y: newTopLeftCoords.y + bottomOffset * unitsPerTile
  };
  const newBottomRightCoords = {
    x: newTopRightCoords.x,
    y: newBottomLeftCoords.y
  };
  if (
    state.tilemap.hasCollisionAtCoords({ x: newTopLeftCoords.x, y: topLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newBottomLeftCoords.x, y: bottomLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newTopRightCoords.x, y: topRightCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newBottomRightCoords.x, y: bottomRightCoords.y })
  ) {
    state.cootsVelocityX *= collisionVelocityFactor;
  }
  else if (
    state.tilemap.hasCollisionAtCoords({ x: topLeftCoords.x, y: newTopLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: bottomLeftCoords.x, y: newBottomLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: topRightCoords.x, y: newTopRightCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: bottomRightCoords.x, y: newBottomRightCoords.y })
  ) {
    state.cootsVelocityY *= collisionVelocityFactor;
  }
  else if (
    state.tilemap.hasCollisionAtCoords({ x: newTopLeftCoords.x, y: newTopLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newBottomLeftCoords.x, y: newBottomLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newTopRightCoords.x, y: newTopRightCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newBottomRightCoords.x, y: newBottomRightCoords.y })
  ) {
    state.cootsVelocityX *= collisionVelocityFactor;
    state.cootsVelocityY *= collisionVelocityFactor;
  }
  else {
    state.cootsCoords = { x: newX, y: newY };
  }
};

export default updateCootsPosition;