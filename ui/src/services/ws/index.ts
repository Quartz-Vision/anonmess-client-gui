import { EventEmitter } from "eventemitter3";
import { sleep } from "utils/async";


export const wsEvents = new EventEmitter();

type WSMessage = (Parameters<typeof WebSocket.prototype.send>)[0];
type ClientEvent = {
  type: string;
  data: any;
};
export type Chat = {
  id: string;
	name: string;
};
export type ChatMessage = {
	chat: Chat;
	text: string;
};

let initialized = false;
let messages: WSMessage[] = [];
let ws: WebSocket|null;

const activateSender = Symbol('sendAll');
const sendAll = async () => {
  let message: WSMessage|undefined;
  while (messages.length) {
    if (ws && (message = messages.shift()) !== undefined) {
      try {
        ws.send(message);
      } catch (e) {
        messages.unshift(message);
        await sleep(1000);
      }
    }
  }
  wsEvents.once(activateSender, sendAll);
};

const connect = () => {
  const socket = new WebSocket("ws://127.0.0.1:8061");
  socket.onopen = () => {
    ws = socket;
    wsEvents.emit(activateSender);
  };

  socket.onclose = async e => {
    ws = null;
    console.log('Socket is closed. Reconnect will be attempted in 1 second.', e.reason);
    await sleep(1000);
    connect();
  };

  socket.onerror = err => {
    if (err instanceof ErrorEvent) {
      console.error('Socket encountered error: ', err.message, 'Closing socket');
    }
    socket.close();
  };

  socket.onmessage = msg => {
    if (typeof msg.data === 'string') {
      try {
        const event: ClientEvent = JSON.parse(msg.data);
        wsEvents.emit(event.type, event.data);
      } catch (e) {
        console.error('Event decoding error. Event contents: ', msg.data);
      }
    }
  }
};

export const initWS = () => {
  if (initialized) return;
  initialized = true;

  wsEvents.once(activateSender, sendAll);

  connect();
};

export const EVENT_NEW_MESSAGE = "new-message";
export const sendMessage = (data: string) => {
  messages.push(data);
  wsEvents.emit(activateSender);
}
