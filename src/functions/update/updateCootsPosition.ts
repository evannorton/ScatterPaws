import unitsPerTile from "../../constants/unitsPerTile";
import state from "../../state";

const updateCootsPosition = (): void => {
  const topLeftCoords = {
    x: state.cootsCoords.x - .75 * unitsPerTile,
    y: state.cootsCoords.y - .5 * unitsPerTile
  };
  const topRightCoords = {
    x: topLeftCoords.x + 1 * unitsPerTile,
    y: topLeftCoords.y
  };
  const bottomLeftCoords = {
    x: topLeftCoords.x,
    y: topLeftCoords.y + .5 * unitsPerTile
  };
  const bottomRightCoords = {
    x: topRightCoords.x,
    y: bottomLeftCoords.y
  };
  const newX: number = state.cootsCoords.x + Math.floor(state.cootsVelocityX * (state.app.ticker.deltaMS / 1000));
  const newY: number = state.cootsCoords.y + Math.floor(state.cootsVelocityY * (state.app.ticker.deltaMS / 1000));
  const newTopLeftCoords = {
    x: newX - .75 * unitsPerTile,
    y: newY - .5 * unitsPerTile
  };
  const newTopRightCoords = {
    x: newTopLeftCoords.x + 1 * unitsPerTile,
    y: newTopLeftCoords.y
  };
  const newBottomLeftCoords = {
    x: newTopLeftCoords.x,
    y: newTopLeftCoords.y + .5 * unitsPerTile
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
    state.cootsVelocityX *= -1;
  }
  else if (
    state.tilemap.hasCollisionAtCoords({ x: topLeftCoords.x, y: newTopLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: bottomLeftCoords.x, y: newBottomLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: topRightCoords.x, y: newTopRightCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: bottomRightCoords.x, y: newBottomRightCoords.y })
  ) {
    state.cootsVelocityY *= -1;
  }
  else if (
    state.tilemap.hasCollisionAtCoords({ x: newTopLeftCoords.x, y: newTopLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newBottomLeftCoords.x, y: bottomLeftCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newTopRightCoords.x, y: newTopRightCoords.y })
    || state.tilemap.hasCollisionAtCoords({ x: newBottomRightCoords.x, y: bottomRightCoords.y })
  ) {
    state.cootsVelocityX *= -1;
    state.cootsVelocityY *= -1;
  }
  else {
    state.cootsCoords = { x: newX, y: newY };
  }
};

export default updateCootsPosition;