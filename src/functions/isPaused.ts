const isPaused = (): boolean => document.getElementById("screen")?.classList.contains("paused") || false;

export default isPaused;