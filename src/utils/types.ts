export interface User {
  firstname: string;
  lastname: string;
  username: string;
  _id: string;
}

export interface ReduxAction {
  type: string;
  payload?: any;
}

export interface PersonalMessage {
  _id: string;
  to: string;
  from: string;
  text: string;
  tagged: string;
}

export interface PersonalChat {
  to: User;
  messages: PersonalMessage[];
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export interface GroupMessage {
  _id: string;
  user: User;
  text: string;
  tagged: string;
  updatedAt: string;
}

export interface GroupChat {
  _id: string;
  name: string;
  messages: GroupMessage;
  members: User[];
  createdAt: string;
  updatedAt: string;
}

export type Chats = [PersonalChat | GroupChat];
