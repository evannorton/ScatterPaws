import { io } from "socket.io-client";
import isRunningOnLocal from "./functions/isRunningOnLocal";

const socket = isRunningOnLocal() ? io(location.href, {
  autoConnect: true
}) : null;

export default socket;