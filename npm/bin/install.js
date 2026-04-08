#!/usr/bin/env node
// Downloads the pre-built Go binary for the current platform from GitHub Releases.
// Runs as npm postinstall hook — users never need Go installed.
//
// Security note: execFileSync is used instead of execSync to prevent shell injection.
// All arguments are hardcoded from package.json and platform detection — no user input.

const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const https = require("https");
const { pipeline } = require("stream/promises");

const VERSION = require("../package.json").version;
const REPO = "ialbahub/mcp-azure-sql";
const BINARY = process.platform === "win32" ? "mcp-azure-sql.exe" : "mcp-azure-sql";
const BIN_DIR = __dirname;
const BINARY_PATH = path.join(BIN_DIR, BINARY);

const PLATFORM_MAP = { linux: "linux", darwin: "darwin", win32: "windows" };
const ARCH_MAP = { x64: "amd64", arm64: "arm64" };

const platform = PLATFORM_MAP[process.platform];
const arch = ARCH_MAP[process.arch];

if (!platform || !arch) {
  console.error(`Unsupported platform: ${process.platform}/${process.arch}`);
  process.exit(1);
}

const ext = platform === "windows" ? "zip" : "tar.gz";
const url = `https://github.com/${REPO}/releases/download/v${VERSION}/mcp-azure-sql_${platform}_${arch}.${ext}`;

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 302 || res.statusCode === 301) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode} from ${url}`));
        return;
      }
      resolve(res);
    }).on("error", reject);
  });
}

async function install() {
  if (fs.existsSync(BINARY_PATH)) {
    console.log(`mcp-azure-sql already installed at ${BINARY_PATH}`);
    return;
  }

  console.log(`Downloading mcp-azure-sql v${VERSION} (${platform}/${arch})...`);
  console.log(`  ${url}`);

  try {
    const stream = await download(url);
    const tmpFile = path.join(BIN_DIR, `_download.${ext}`);
    const ws = fs.createWriteStream(tmpFile);
    await pipeline(stream, ws);

    if (ext === "tar.gz") {
      execFileSync("tar", ["xzf", tmpFile, "-C", BIN_DIR, "mcp-azure-sql"], { stdio: "pipe" });
    } else {
      execFileSync("powershell", [
        "-Command",
        `Expand-Archive -Path '${tmpFile}' -DestinationPath '${BIN_DIR}' -Force`
      ], { stdio: "pipe" });
    }

    fs.unlinkSync(tmpFile);

    if (process.platform !== "win32") {
      fs.chmodSync(BINARY_PATH, 0o755);
    }

    console.log(`Installed: ${BINARY_PATH}`);
  } catch (err) {
    console.error(`Failed to download binary: ${err.message}`);
    console.error(`Download manually from: https://github.com/${REPO}/releases`);
    process.exit(1);
  }
}

install();
