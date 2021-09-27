import { io } from "socket.io-client";
import { baseURL } from "../services/api";

interface Props {
  message: string;
  data: object;
  callback?: (value?: any) => void;
}

const socket = io(baseURL);
export const useEmitSocket = ({ message, data }: Props) => {
  socket.emit(message, data);
};

export const useOnSocket = ({ message, callback, }: Props) => {
  socket.on(message, (data) => callback && callback(data));
}