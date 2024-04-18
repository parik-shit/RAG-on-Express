// Import required modules
const express = require('express');
const { spawn } = require('child_process');

// Create an Express app
const app = express();
const port = 3000;

// Middleware to parse JSON requests
app.use(express.json());

let pythonProcess; // Variable to store the Python process

// Route to start the Python process and send initial input
app.post('/start-process', (req, res) => {
  if (!pythonProcess) {
    pythonProcess = spawn('python', ['app.py']);

    let output = ''; // Initialize an empty variable to store the entire output

    pythonProcess.stdout.on('data', (data) => { // No need for this event listener since we read the entire output below
      output += data.toString().trim(); // Append each chunk of data to the output string
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error('Python script error:', data.toString());
    });

    pythonProcess.on('exit', (code) => {
      // Send the entire output back to the client as a response when the Python process has finished
      res.send({ input: req.body.input, output });
      console.log('Python script exited with code', code);
      pythonProcess = null;
    });

    req.on('close', () => { // Close the request socket to signal that the server has finished sending its response
      pythonProcess.stdin.end(req.body.input + '\n'); // Send the initial input data to the Python script
    });
  } else {
    res.sendStatus(409); // Conflict status to indicate that a process is already running
  }
});

// Route to send additional input to the Python process
app.post('/send-input', (req, res) => {
  if (!pythonProcess) {
    return res.status(500).send('Python process is not running.');
  }

  const { input, origin } = req.body;

  pythonProcess.stdin.write(input + '\n');

  // Wait for the Python process to finish sending its output before sending a response back to the client
  pythonProcess.once('exit', () => {
    res.sendStatus(204); // No Content status since no data is being sent back in the response
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
