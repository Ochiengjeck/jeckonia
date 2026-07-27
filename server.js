// Custom Node.js entry point for hosts that run the app via Phusion Passenger
// (e.g. Spaceship's cPanel "Setup Node.js App" tool) instead of invoking the
// Next.js CLI directly. Passenger expects a script it can require and that
// listens on the port it assigns via process.env.PORT -- `next start` alone
// doesn't reliably pick that up when spawned this way, so this wraps Next's
// custom-server API instead. Requires `next build` to have already run.
const http = require("http");
const next = require("next");

const app = next({ dev: false });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

app
  .prepare()
  .then(() => {
    http
      .createServer((req, res) => handle(req, res))
      .listen(port, (err) => {
        if (err) throw err;
        console.log(`Next.js server listening on port ${port}`);
      });
  })
  .catch((err) => {
    console.error("Failed to start Next.js server:", err);
    process.exit(1);
  });
