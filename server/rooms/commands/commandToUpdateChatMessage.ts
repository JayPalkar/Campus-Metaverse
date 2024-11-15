import { Command } from "@colyseus/command";
import { Client } from "colyseus";
import { IRoomState } from "../../../types/roomState";
import { ChatMessage } from "../schema/RoomState";

type Payload = {
  client: Client;
  content: string;
};

export default class CommandToUpdateChatMessage extends Command<
  IRoomState,
  Payload
> {
  execute(data: Payload) {
    const { client, content } = data;
    const player = this.room.state.players.get(client.sessionId);
    const chatMessages = this.room.state.chatMessages;

    if (!chatMessages) return;

    if (chatMessages.length >= 100) chatMessages.shift();
    const newMessage = new ChatMessage();
    newMessage.author = player.name;
    newMessage.content = content;
    chatMessages.push(newMessage);
  }
}
