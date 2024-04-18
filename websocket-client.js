const WebSocket = require('ws');
const readline = require('readline');

const ws = new WebSocket('ws://localhost:3000'); // WebSocket server address

// WebSocket connection open event
ws.on('open', () => {
  console.log('WebSocket client connected');

  // Create a readline interface for user input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  // Ask the user for input
  rl.question('Enter your input: ', (input) => {
    // Send input to Python script
    sendInputToPython(input);

    // Close the readline interface (after sending input)
    rl.close();
  });

  // Handle WebSocket messages from server
  ws.on('message', (message) => {
    console.log(`Received message from server: ${message}`);
    // Here, you can handle additional messages from the server if needed
  });
});

// WebSocket close event (handle disconnection)
ws.on('close', (code, reason) => {
  console.log(`WebSocket disconnected with code ${code} and reason: ${reason}`);
  // Optionally, implement reconnect logic here
});

// WebSocket error event (handle errors)
ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

// Function to send input to Python script
const sendInputToPython = (input) => {
  ws.send(JSON.stringify({ input }));
};
