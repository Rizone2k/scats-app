import { io } from "socket.io-client";
const socket = io('http://192.168.1.6:5550/');

export default socket;