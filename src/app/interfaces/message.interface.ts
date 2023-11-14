import {User} from "./user.interface";

export interface Message {
  id: string;
  text: string;
  author: User;
  createdAt: string;
}
