const express = require('express');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());

let pythonProcess;
const pythonScriptPath = path.join(__dirname, './api/app.py'); // Relative path to app.py

// Function to start the detached Python process
function startPythonProcess() {
  pythonProcess = spawn('python', [pythonScriptPath], {
    detached: true,
    stdio: ['pipe', 'pipe', 'ignore'], // Keep stdin and stdout open, close stderr
  });

  pythonProcess.unref(); // Unreference the child process to let it run independently

  pythonProcess.on('exit', (code) => {
    console.log('Python process exited with code:', code);
    pythonProcess = null; // Reset pythonProcess when it exits
  });
}

// Route to send input to the detached Python process
app.post('/send-input', (req, res) => {
  if (!pythonProcess || pythonProcess.killed) {
    console.error('Python process is not running.');
    return res.status(500).send('Python process is not running.');
  }

  if (!pythonProcess.stdin) {
    console.error('Python process stdin stream is closed.');
    return res.status(500).send('Python process stdin stream is closed.');
  }

  console.log('Received input:', req.body.input); // Log the input received

  // Send input to the stdin of the detached process
  pythonProcess.stdin.write(req.body.input + '\n');

  // Listen for data on stdout of the Python process
  pythonProcess.stdout.on('data', (data) => {
    console.log('Received output from Python process:', data.toString());
    res.end(data.toString()); // Send stdout data as response
  });
});

// Start the Python process on server start
startPythonProcess();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

