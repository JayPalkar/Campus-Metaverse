import http from "http";
import express from "express";
import cors from "cors";
import { Server, LobbyRoom } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { RoomType } from "../types/Room";

import { CampusMetaverse } from "./rooms/campusMetaverse";

const port = Number(process.env.PORT || 3000);
const app = express();

const server = http.createServer(app);
const metaverseServer = new Server({
  server,
});

metaverseServer.define(RoomType.LOBBY, LobbyRoom);
metaverseServer.define(RoomType.PUBLIC, CampusMetaverse, {
  name: "campus",
  description: "For connecting students in a virtual gamified world",
  autoDispose: false,
});
app.use("/colyseus", monitor());

metaverseServer.listen(port);
console.log(`Listening on port: ${port}`);
