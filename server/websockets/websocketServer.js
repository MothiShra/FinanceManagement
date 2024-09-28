const WebSocket = require('ws');

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 3001 });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected');

  // Handle incoming messages from clients
  ws.on('message', (message) => {
    console.log('Received message:', message);
    
    // Broadcast message to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  // Handle WebSocket disconnections
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

module.exports = wss;
