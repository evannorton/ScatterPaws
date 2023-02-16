const isRunningOnLocal = (): boolean => location.host === "localhost:3000";

export default isRunningOnLocal;