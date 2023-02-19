import state from "../../state";

const updateCootsPosition = (): void => {
  state.cootsCoords = {
    x: state.cootsCoords.x + Math.floor(state.cootsVelocityX * (state.app.ticker.deltaMS / 1000)),
    y: state.cootsCoords.y + Math.floor(state.cootsVelocityY * (state.app.ticker.deltaMS / 1000))
  }
};

export default updateCootsPosition;