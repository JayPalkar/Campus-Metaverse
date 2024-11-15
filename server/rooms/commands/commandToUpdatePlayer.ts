import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { IRoomState } from "../../../types/roomState";

type Payload = {
  client: Client;
  x: number;
  y: number;
  animation: string;
};

export default class PlayerUpdateCommand extends Command<IRoomState, Payload> {
  execute(data: Payload) {
    const { client, x, y, animation } = data;

    const player = this.room.state.players.get(client.sessionId);

    if (!player) return;

    player.x = x;
    player.y = y;
    player.animation = animation;
  }
}
