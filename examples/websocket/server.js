import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({port: 3000});

wss.on("connection", (ws) => {
	console.log("Connected to client!");

	ws.on("message", () => {
		ws.send(`Random number: ${Math.random()}`);
	});
});

console.log("WebSocket Server listening on port 3000");