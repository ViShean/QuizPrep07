import express from "express";

const app = express();

// ✅ Dangerous user input (for eval)
const userInput = "console.log('danger')";
eval(userInput); // ⚠️ Triggers security warning

// ✅ Dangerous innerHTML (unsanitized property)
if (typeof document !== "undefined") {
  document.body.innerHTML = "<img src=x onerror=alert('XSS1')>";
}

// ✅ Dangerous insertAdjacentHTML (unsanitized method)
if (typeof document !== "undefined") {
  const div = document.createElement("div");
  div.insertAdjacentHTML("beforeend", "<img src=x onerror=alert('XSS2')>");
}

// Endpoint to return the current timestamp
app.get("/timestamp", (req, res) => {
  res.json({ timestamp: getCurrentTimestamp() });
});

// Helper function to get the current timestamp
export function getCurrentTimestamp() {
  return new Date().toISOString();
}

// Serve a simple HTML page
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Browser Info</title>
    </head>
    <body>
      <h1>Browser and Timestamp Info</h1>
      <p id="browser-info">Loading browser details...</p>
      <p id="timestamp">Fetching server timestamp...</p>
      <script>
        // Display browser information
        const userAgent = navigator.userAgent;
        document.getElementById('browser-info').textContent = 'Your browser: ' + userAgent;

        // Dangerous: unsanitized DOM injection
        const userInput = "<img src=x onerror=alert('inlineXSS')>";
        document.body.innerHTML = userInput;

        // Dangerous: insertAdjacentHTML
        const div = document.createElement('div');
        div.insertAdjacentHTML('beforeend', userInput);
        document.body.appendChild(div);

        // Fetch and display the server timestamp
        fetch('/timestamp')
          .then(response => response.json())
          .then(data => {
            document.getElementById('timestamp').textContent = 'Server timestamp: ' + data.timestamp;
          })
          .catch(err => {
            document.getElementById('timestamp').textContent = 'Error fetching timestamp';
          });
      </script>
    </body>
    </html>
  `);
});

// Start the server
const PORT = 3000;
const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

// Export the server for tests
export { server };
