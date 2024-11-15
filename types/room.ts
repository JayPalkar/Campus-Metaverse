export enum RoomType {
  LOBBY = "lobby",
  PUBLIC = "Campus",
}

export interface RoomData {
  name: String;
  description: String;
  password: string | null;
  autoDispose: boolean;
}
