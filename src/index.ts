import run from "./functions/run";

document.onreadystatechange = (): void => {
  if (document.readyState === "complete") {
    run();
  }
};