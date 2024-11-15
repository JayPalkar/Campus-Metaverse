import {
  Schema,
  ArraySchema,
  SetSchema,
  MapSchema,
  type,
} from "@colyseus/schema";
import {
  IPlayer,
  IRoomState,
  IComputer,
  IWhiteboard,
  IChatMessage,
} from "../../../types/roomState";

export class Player extends Schema implements IPlayer {
  anim: string;
  @type("string") name = "";
  @type("number") x = 705;
  @type("number") y = 500;
  @type("string") animation = "adam_idle_down";
  @type("boolean") readyToConnect: boolean;
  @type("boolean") videoConnected: boolean;
}

export class Computer extends Schema implements IComputer {
  @type({ set: "string" }) connectedUser = new SetSchema<string>();
}

export class Whiteboard extends Schema implements IWhiteboard {
  @type("string") roomId: string;
  @type({ set: "string" }) connectedUser = new SetSchema<string>();

  constructor() {
    super();
    this.roomId = getRoomId(); // Assigning the generated roomId here
  }
}

export class ChatMessage extends Schema implements IChatMessage {
  @type("string") author = "";
  @type("number") createdAt = new Date().getTime();
  @type("string") content = "";
}

export class RoomState extends Schema implements IRoomState {
  @type({ map: Player })
  players = new MapSchema<Player>();

  @type({ map: Computer })
  computers = new MapSchema<Computer>();

  @type({ map: Whiteboard })
  whiteboards = new MapSchema<Whiteboard>();

  @type([ChatMessage])
  chatMessages = new ArraySchema<ChatMessage>();
}

export const whiteboardRoomIds = new Set<string>();
const symbols =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const symbolsLengths = symbols.length;

function getRoomId(): string {
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += symbols.charAt(Math.floor(Math.random() * symbolsLengths));
  }
  if (!whiteboardRoomIds.has(result)) {
    whiteboardRoomIds.add(result);
    return result;
  } else {
    console.log("Existing Room Id, creating new one");
    return getRoomId();
  }
}
