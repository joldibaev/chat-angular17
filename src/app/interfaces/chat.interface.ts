import {Message} from "./message.interface";

export interface Chat {
  id: string;
  name: string;
  lastMessage: Message;
}
