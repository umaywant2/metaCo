#!/usr/bin/env node

// metaCo Native Messaging Host
// Reads/writes state.json for CLI ↔ Extension sync

const fs = require('fs');
const os = require('os');
const path = require('path');

fs.mkdirSync(path.dirname(stateFile), { recursive: true });

// Determine platform-specific state file path
function getStateFilePath() {
  switch (os.platform()) {
    case 'win32':
      return path.join(process.env.LOCALAPPDATA, 'metaCo', 'state.json');
    case 'linux':
      return path.join(process.env.HOME, '.local/share/metaCo/state.json');
    case 'darwin':
      return path.join(process.env.HOME, 'Library/Application Support/metaCo/state.json');
    default:
      throw new Error('Unsupported OS');
  }
}

// Helper: read message from stdin
function readMessage() {
  const buffer = Buffer.alloc(4);
  if (fs.readSync(0, buffer, 0, 4, null) !== 4) return null;
  const msgLength = buffer.readUInt32LE(0);
  const msgBuffer = Buffer.alloc(msgLength);
  fs.readSync(0, msgBuffer, 0, msgLength, null);
  return JSON.parse(msgBuffer.toString());
}

// Helper: write message to stdout
function writeMessage(msg) {
  const json = JSON.stringify(msg);
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(Buffer.byteLength(json), 0);
  fs.writeSync(1, buffer);
  fs.writeSync(1, json);
}

// Main loop
(function main() {
  try {
    const msg = readMessage();
    if (!msg) return;

    const stateFile = getStateFilePath();

    if (msg.type === 'read') {
      if (fs.existsSync(stateFile)) {
        const data = fs.readFileSync(stateFile, 'utf8');
        writeMessage({ success: true, data: JSON.parse(data) });
      } else {
        writeMessage({ success: false, error: 'State file not found' });
      }
    } else if (msg.type === 'write') {
      fs.mkdirSync(path.dirname(stateFile), { recursive: true });
      fs.writeFileSync(stateFile, JSON.stringify(msg.data));
      writeMessage({ success: true });
    } else {
      writeMessage({ success: false, error: 'Unknown message type' });
    }
  } catch (err) {
    writeMessage({ success: false, error: err.message });
  }
})();
