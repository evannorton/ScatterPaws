import run from "./functions/run";

declare global {
  interface Window {
    ngio: {
      callComponent: (arg1: string, arg2: { id: number; }) => void;
      debug: boolean;
      getValidSession: (arg: () => void) => void;
      user: unknown;
    };
  }
}

document.onreadystatechange = (): void => {
  if (document.readyState === "complete") {
    run();
  }
};