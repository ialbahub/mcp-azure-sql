#!/usr/bin/env node
// Thin wrapper that spawns the Go binary with raw stdio passthrough.
// This is the npm `bin` entry point — what runs when you do `npx mcp-azure-sql`.

const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");

const BINARY = process.platform === "win32" ? "mcp-azure-sql.exe" : "mcp-azure-sql";
const BINARY_PATH = path.join(__dirname, BINARY);

if (!fs.existsSync(BINARY_PATH)) {
  console.error("Binary not found. Run: npm run postinstall");
  process.exit(1);
}

const child = spawn(BINARY_PATH, process.argv.slice(2), {
  stdio: ["inherit", "inherit", "inherit"],
  env: process.env,
});

child.on("exit", (code) => process.exit(code || 0));
child.on("error", (err) => {
  console.error(`Failed to start mcp-azure-sql: ${err.message}`);
  process.exit(1);
});

// Forward signals for clean shutdown
process.on("SIGINT", () => child.kill("SIGINT"));
process.on("SIGTERM", () => child.kill("SIGTERM"));
