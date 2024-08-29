import WebSocket, { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', function connection(ws) {
  ws.id = uuidv4(); // Assign a UUID to the client

//   console.log(`New connection from client with ID: ${ws.id}`);

  ws.on('error', console.error);

  ws.on('message', function message(data, isBinary) {
    // console.log(`Received message from client ${ws.id}: ${data}`);

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });

  ws.on('close', () => {
    console.log(`Client ${ws.id} disconnected`);
  });
});
