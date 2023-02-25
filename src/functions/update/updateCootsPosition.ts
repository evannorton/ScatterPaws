import obstacleDuration from "../../constants/obstacleDuration";
import obstacleInvincibleDuration from "../../constants/obstacleInvincibleDuration";
import unitsPerTile from "../../constants/unitsPerTile";
import CollisionType from "../../enums/CollisionType";
import state from "../../state";
import getAudioSource from "../definables/getAudioSource";
import getTilemap from "../definables/getTilemap";

const updateCootsPosition = (): void => {
  const collisionVelocityFactor = -.7;
  // Furniture
  const furnitureLeftOffset: number = -.4;
  const furnitureTopOffset: number = - .5;
  const furnitureBottomOffset: number = .85;
  const furnitureRightOffset: number = .9;
  const furnitureTopLeftCoords = {
    x: state.cootsCoords.x + furnitureLeftOffset * unitsPerTile,
    y: state.cootsCoords.y + furnitureTopOffset * unitsPerTile
  };
  const furnitureTopRightCoords = {
    x: furnitureTopLeftCoords.x + furnitureRightOffset * unitsPerTile,
    y: furnitureTopLeftCoords.y
  };
  const furnitureBottomLeftCoords = {
    x: furnitureTopLeftCoords.x,
    y: furnitureTopLeftCoords.y + furnitureBottomOffset * unitsPerTile
  };
  const furnitureBottomRightCoords = {
    x: furnitureTopRightCoords.x,
    y: furnitureBottomLeftCoords.y
  };
  const newX: number = state.cootsCoords.x + Math.floor(state.cootsVelocityX * (state.app.ticker.deltaMS / 1000));
  const newY: number = state.cootsCoords.y + Math.floor(state.cootsVelocityY * (state.app.ticker.deltaMS / 1000));
  const furnitureNewTopLeftCoords = {
    x: newX + furnitureLeftOffset * unitsPerTile,
    y: newY + furnitureTopOffset * unitsPerTile
  };
  const furnitureNewTopRightCoords = {
    x: furnitureNewTopLeftCoords.x + furnitureRightOffset * unitsPerTile,
    y: furnitureNewTopLeftCoords.y
  };
  const furnitureNewBottomLeftCoords = {
    x: furnitureNewTopLeftCoords.x,
    y: furnitureNewTopLeftCoords.y + furnitureBottomOffset * unitsPerTile
  };
  const furnitureNewBottomRightCoords = {
    x: furnitureNewTopRightCoords.x,
    y: furnitureNewBottomLeftCoords.y
  };
  const furnitureXCollision = [
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureNewTopLeftCoords.x, y: furnitureTopLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureNewBottomLeftCoords.x, y: furnitureBottomLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureNewTopRightCoords.x, y: furnitureTopRightCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureNewBottomRightCoords.x, y: furnitureBottomRightCoords.y })
  ];
  const furnitureYCollision = [
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureTopLeftCoords.x, y: furnitureNewTopLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureBottomLeftCoords.x, y: furnitureNewBottomLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureTopRightCoords.x, y: furnitureNewTopRightCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureBottomRightCoords.x, y: furnitureNewBottomRightCoords.y })
  ];
  const furnitureBothCollision = [
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureNewTopLeftCoords.x, y: furnitureNewTopLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureNewBottomLeftCoords.x, y: furnitureNewBottomLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureNewTopRightCoords.x, y: furnitureNewTopRightCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: furnitureNewBottomRightCoords.x, y: furnitureNewBottomRightCoords.y })
  ];
  // Obstacles
  const obstacleLeftOffset: number = 0;
  const obstacleTopOffset: number = 0;
  const obstacleBottomOffset: number = 0;
  const obstacleRightOffset: number = 0;
  const obstacleTopLeftCoords = {
    x: state.cootsCoords.x + obstacleLeftOffset * unitsPerTile,
    y: state.cootsCoords.y + obstacleTopOffset * unitsPerTile
  };
  const obstacleTopRightCoords = {
    x: obstacleTopLeftCoords.x + obstacleRightOffset * unitsPerTile,
    y: obstacleTopLeftCoords.y
  };
  const obstacleBottomLeftCoords = {
    x: obstacleTopLeftCoords.x,
    y: obstacleTopLeftCoords.y + obstacleBottomOffset * unitsPerTile
  };
  const obstacleBottomRightCoords = {
    x: obstacleTopRightCoords.x,
    y: obstacleBottomLeftCoords.y
  };
  const obstacleNewTopLeftCoords = {
    x: newX + obstacleLeftOffset * unitsPerTile,
    y: newY + obstacleTopOffset * unitsPerTile
  };
  const obstacleNewTopRightCoords = {
    x: obstacleNewTopLeftCoords.x + obstacleRightOffset * unitsPerTile,
    y: obstacleNewTopLeftCoords.y
  };
  const obstacleNewBottomLeftCoords = {
    x: obstacleNewTopLeftCoords.x,
    y: obstacleNewTopLeftCoords.y + obstacleBottomOffset * unitsPerTile
  };
  const obstacleNewBottomRightCoords = {
    x: obstacleNewTopRightCoords.x,
    y: obstacleNewBottomLeftCoords.y
  };
  const obstacleXCollision = [
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleNewTopLeftCoords.x, y: obstacleTopLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleNewBottomLeftCoords.x, y: obstacleBottomLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleNewTopRightCoords.x, y: obstacleTopRightCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleNewBottomRightCoords.x, y: obstacleBottomRightCoords.y })
  ];
  const obstacleYCollision = [
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleTopLeftCoords.x, y: obstacleNewTopLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleBottomLeftCoords.x, y: obstacleNewBottomLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleTopRightCoords.x, y: obstacleNewTopRightCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleBottomRightCoords.x, y: obstacleNewBottomRightCoords.y })
  ];
  const obstacleBothCollision = [
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleNewTopLeftCoords.x, y: obstacleNewTopLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleNewBottomLeftCoords.x, y: obstacleNewBottomLeftCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleNewTopRightCoords.x, y: obstacleNewTopRightCoords.y }),
    getTilemap(state.level.tilemapSlug).getCollisionAtCoords({ x: obstacleNewBottomRightCoords.x, y: obstacleNewBottomRightCoords.y })
  ];
  // Checks
  const invincible: boolean = state.hasHitObstacleAt() && state.currentTime - state.hitObstacleAt < obstacleInvincibleDuration + obstacleDuration;
  if (invincible === false && obstacleXCollision.some((collision) => collision === CollisionType.Obstacle)) {
    state.hitObstacleAt = state.currentTime;
  }
  else if (invincible === false && obstacleYCollision.some((collision) => collision === CollisionType.Obstacle)) {
    state.hitObstacleAt = state.currentTime;
  }
  else if (invincible === false && obstacleBothCollision.some((collision) => collision === CollisionType.Obstacle)) {
    state.hitObstacleAt = state.currentTime;
  }
  else if (furnitureXCollision.some((collision) => collision === CollisionType.Bonk)) {
    state.cootsVelocityX *= collisionVelocityFactor;
    getAudioSource("noises/bounce").play(null, null);
  }
  else if (furnitureYCollision.some((collision) => collision === CollisionType.Bonk)) {
    state.cootsVelocityY *= collisionVelocityFactor;
    getAudioSource("noises/bounce").play(null, null);
  }
  else if (furnitureBothCollision.some((collision) => collision === CollisionType.Bonk)) {
    state.cootsVelocityX *= collisionVelocityFactor;
    state.cootsVelocityY *= collisionVelocityFactor;
    getAudioSource("noises/bounce").play(null, null);
  }
  else {
    state.cootsCoords = { x: newX, y: newY };
  }
};

export default updateCootsPosition;