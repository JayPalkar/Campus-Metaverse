export enum RoomType {
  LOBBY = "lobby",
  PUBLIC = "Campus",
}

export interface RoomData {
  name: string;
  description: string;
  // password: string | null;
  autoDispose: boolean;
}
