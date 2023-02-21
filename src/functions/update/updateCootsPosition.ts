import unitsPerTile from "../../constants/unitsPerTile";
import CollisionType from "../../enums/CollisionType";
import state from "../../state";

const updateCootsPosition = (): void => {
  const collisionVelocityFactor = -.75;
  const leftOffset: number = -.4;
  const topOffset: number = - .5;
  const bottomOffset: number = .85;
  const rightOffset: number = .9;
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
  const xCollision1 = state.tilemap.getCollisionAtCoords({ x: newTopLeftCoords.x, y: topLeftCoords.y });
  const xCollision2 = state.tilemap.getCollisionAtCoords({ x: newBottomLeftCoords.x, y: bottomLeftCoords.y });
  const xCollision3 = state.tilemap.getCollisionAtCoords({ x: newTopRightCoords.x, y: topRightCoords.y });
  const xCollision4 = state.tilemap.getCollisionAtCoords({ x: newBottomRightCoords.x, y: bottomRightCoords.y });
  const yCollision1 = state.tilemap.getCollisionAtCoords({ x: topLeftCoords.x, y: newTopLeftCoords.y });
  const yCollision2 = state.tilemap.getCollisionAtCoords({ x: bottomLeftCoords.x, y: newBottomLeftCoords.y });
  const yCollision3 = state.tilemap.getCollisionAtCoords({ x: topRightCoords.x, y: newTopRightCoords.y });
  const yCollision4 = state.tilemap.getCollisionAtCoords({ x: bottomRightCoords.x, y: newBottomRightCoords.y });
  const bothCollision1 = state.tilemap.getCollisionAtCoords({ x: newTopLeftCoords.x, y: newTopLeftCoords.y })
  const bothCollision2 = state.tilemap.getCollisionAtCoords({ x: newBottomLeftCoords.x, y: newBottomLeftCoords.y })
  const bothCollision3 = state.tilemap.getCollisionAtCoords({ x: newTopRightCoords.x, y: newTopRightCoords.y })
  const bothCollision4 = state.tilemap.getCollisionAtCoords({ x: newBottomRightCoords.x, y: newBottomRightCoords.y })
  if (
    xCollision1 === CollisionType.Bonk
    || xCollision2 === CollisionType.Bonk
    || xCollision3 === CollisionType.Bonk
    || xCollision4 === CollisionType.Bonk
  ) {
    state.cootsVelocityX *= collisionVelocityFactor;
  }
  else if (
    yCollision1 === CollisionType.Bonk
    || yCollision2 === CollisionType.Bonk
    || yCollision3 === CollisionType.Bonk
    || yCollision4 === CollisionType.Bonk
  ) {
    state.cootsVelocityY *= collisionVelocityFactor;
  }
  else if (
    bothCollision1 === CollisionType.Bonk
    || bothCollision2 === CollisionType.Bonk
    || bothCollision3 === CollisionType.Bonk
    || bothCollision4 === CollisionType.Bonk
  ) {
    state.cootsVelocityX *= collisionVelocityFactor;
    state.cootsVelocityY *= collisionVelocityFactor;
  }
  else {
    state.cootsCoords = { x: newX, y: newY };
  }
};

export default updateCootsPosition;