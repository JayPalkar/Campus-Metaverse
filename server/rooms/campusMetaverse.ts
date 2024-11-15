import { Room } from "colyseus";
import { RoomState } from "./schema/RoomState";

export class CampusMetaverse extends Room<RoomState> {}
