# 🌐 metaCo: Minimal Meta‑Service for Copilot Routing

## 🎯 Purpose
metaCo is a **lean, user‑focused router** for Copilot queries across silos.  
- **Minimal footprint**: lightweight, toggleable, no bloat.  
- **User‑first design**: simple On/Off control, transparent routing.  
- **Developer‑friendly**: clean codebase, easy to fork, remix, or extend.  
- **Cross‑platform**: works as a browser extension + CLI hooks, portable across Chromium browsers (Edge, Chrome, Brave, Vivaldi).  

---

## 🛠️ Core Goals

1. **Minimal**  
   - Extension footprint <50MB runtime.  
   - No persistent background services unless toggled.  
   - Sandbox‑style isolation with only essential permissions.  

2. **User‑Focused**  
   - One‑click On/Off toggle in browser.  
   - CLI hooks (`metaco on/off`) for power users.  
   - Transparent logs: every routed query is visible to the user.  

3. **Browser Extension + CLI Hooks**  
   - Built on Chromium Manifest V3 APIs.  
   - Native hooks:  
     - Windows → PowerShell + registry toggles.  
     - Linux → Bash + systemd/dconf.  
     - Mac → AppleScript/shell.  

4. **Minimal & Remixable**  
   - Clean modular codebase.  
   - MIT License → open remix culture.  
   - Developer‑friendly scaffolding: clear docs, simple architecture diagram, no over‑engineering.  

---

## 📐 Architecture Sketch

```
User Query
   ↓
metaCo Router (Browser Extension)
   ↓
Intent Detection → Silo Selection
   ↓
Native Hook (CLI / Script / Registry)
   ↓
Target Copilot (Edge, GitHub, Dynamics, etc.)
```

- **Router**: lightweight dispatcher.  
- **Hooks**: optional native integrations.  
- **Copilot Silos**: endpoints (Edge Copilot, GitHub Copilot, etc.).  

---

## 🚀 Developer Invitation
metaCo is designed to be **so lean and clean** that any developer can:  
- Fork it instantly.  
- Extend routing logic.  
- Add new silo connectors.  
- Remix it into their own validator‑grade tools.  

---

## 📌 Next Steps
1. Draft minimal extension manifest (permissions: `activeTab`, `storage`).  
2. Build On/Off toggle UI (popup + CLI).  
3. Implement basic routing logic (detect query → forward to silo).  
4. Add native hooks per OS.  
5. Publish repo with README + architecture diagram.  

---

👉 This scaffolding makes metaCo look like a **ready‑to‑remix artifact**: minimal, clear, and inviting.  

---

## 🚀 metaCo Build Plan

### 1. **Repo Foundation**
- ✅ Create `README.md` (we already scaffolded the skeleton).  
- ✅ Add `LICENSE` (MIT).  
- ✅ Seed `scaffolding.md` with architecture sketch + roadmap.  
- 🔜 Initialize `manifest.json` for Chromium extension (minimal permissions).  

---

### 2. **Minimal Extension Core**
- **Popup UI**: On/Off toggle button.  
- **Background script**: listens for toggle state, routes queries.  
- **Storage**: saves toggle state (`chrome.storage.local`).  
- **Permissions**: only `activeTab` + `storage`.  

---

### 3. **CLI Hooks**
- **Windows**: PowerShell script (`metaco.ps1`) → registry toggle.  
- **Linux**: Bash script (`metaco.sh`) → systemd/dconf toggle.  
- **Mac**: AppleScript wrapper (`metaco.applescript`).  
- CLI commands:  
  ```bash
  metaco on
  metaco off
  ```

---

### 4. **Routing Logic**
- **Intent detection**: lightweight keyword map (e.g., “code” → GitHub Copilot, “doc” → Edge Copilot).  
- **Dispatcher**: forwards query to correct silo endpoint.  
- **Logs**: transparent console output for every routed query.  

---

### 5. **Developer Invitation**
- Keep code modular: `router.js`, `hooks/`, `cli/`.  
- Document extension + CLI separately.  
- Encourage remix: “Add your own silo connector in 10 lines of code.”  

---

### 6. **Roadmap Milestones**
- v0.1 → Minimal toggle + routing skeleton.  
- v0.2 → CLI hooks per OS.  
- v0.3 → Intent detection + silo connectors.  
- v1.0 → Public release, developer remix call.  

---

This plan keeps metaCo **lean, user‑focused, and remix‑ready** — exactly the kind of repo that attracts developers to fork, extend, and then explore your richer validator‑grade projects.

---

Perfect — let’s scaffold the **initial `manifest.json`** for metaCo. This is the minimal Chromium extension manifest that sets up the On/Off toggle and routing skeleton:

```json
{
  "manifest_version": 3,
  "name": "metaCo",
  "description": "Minimal meta-service for routing Copilot queries across silos.",
  "version": "0.1",
  "icons": {
    "48": "icons/icon48.png",
    "128": "icons/icon128.png"
  },
  "permissions": [
    "activeTab",
    "storage"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "48": "icons/icon48.png"
    }
  },
  "background": {
    "service_worker": "background.js"
  }
}
```

---

## 🔑 What This Does
- **Manifest v3** → modern, secure, Chromium‑compatible.  
- **Permissions** → only `activeTab` + `storage` (minimal footprint).  
- **Popup UI** → `popup.html` will hold the On/Off toggle.  
- **Background script** → `background.js` listens for toggle state and routes queries.  
- **Icons** → placeholders for extension branding (can be simple glyphs).  

---

## 📂 Next Files to Scaffold
1. **popup.html** → minimal toggle UI.  
   ```html
   <!DOCTYPE html>
   <html>
   <head>
     <title>metaCo Toggle</title>
   </head>
   <body>
     <button id="toggle">Toggle metaCo</button>
     <script src="popup.js"></script>
   </body>
   </html>
   ```

2. **popup.js** → handles button click, saves state.  
   ```javascript
   document.getElementById('toggle').addEventListener('click', async () => {
     const { enabled } = await chrome.storage.local.get('enabled');
     const newState = !enabled;
     await chrome.storage.local.set({ enabled: newState });
     chrome.runtime.sendMessage({ type: 'TOGGLE', enabled: newState });
   });
   ```

3. **background.js** → listens for toggle, routes queries.  
   ```javascript
   chrome.runtime.onMessage.addListener((msg) => {
     if (msg.type === 'TOGGLE') {
       console.log(`metaCo is now ${msg.enabled ? 'ON' : 'OFF'}`);
       // Future: add routing logic here
     }
   });
   ```

---

This gives you a **working skeleton**: installable in any Chromium browser, with a popup button that toggles state and logs it. From here, we can scaffold the **CLI hooks** (PowerShell, Bash, AppleScript) to mirror the toggle outside the browser.

---

Great — let’s scaffold the **Windows PowerShell CLI hook (`metaco.ps1`)** so you can flip metaCo’s toggle state directly from the terminal. This script will sync with the extension’s storage and act as a simple On/Off switch.

---

## 📂 `metaco.ps1`

```powershell
# metaCo CLI Hook (Windows PowerShell)
# Minimal toggle script for metaCo extension

param (
    [Parameter(Mandatory=$true)]
    [ValidateSet("on","off")]
    [string]$action
)

# Path to metaCo state file (shared with extension)
$stateFile = "$env:LOCALAPPDATA\metaCo\state.json"

# Ensure directory exists
if (!(Test-Path (Split-Path $stateFile))) {
    New-Item -ItemType Directory -Path (Split-Path $stateFile) | Out-Null
}

switch ($action) {
    "on" {
        $state = @{ enabled = $true }
        Write-Output "metaCo toggled ON"
    }
    "off" {
        $state = @{ enabled = $false }
        Write-Output "metaCo toggled OFF"
    }
}

# Save state to JSON file
$state | ConvertTo-Json | Set-Content -Path $stateFile -Encoding UTF8
```

---

## 🔑 How It Works
- **Argument**: Run with `on` or `off`.  
  ```powershell
  .\metaco.ps1 on
  .\metaco.ps1 off
  ```
- **State file**: Writes toggle state (`enabled: true/false`) to a JSON file in `%LOCALAPPDATA%\metaCo\state.json`.  
- **Extension sync**: The browser extension’s `background.js` can read this file to stay in sync with CLI toggles.  

---

## 📐 Next Steps
- Add **Linux Bash hook (`metaco.sh`)** → writes to `~/.local/share/metaCo/state.json`.  
- Add **Mac AppleScript hook (`metaco.applescript`)** → writes to `~/Library/Application Support/metaCo/state.json`.  
- Update `background.js` to check the state file periodically or on startup, so CLI and browser stay aligned.  

---

Perfect — let’s scaffold the **Linux Bash CLI hook (`metaco.sh`)** so metaCo can be toggled from the terminal on Linux systems. This mirrors the PowerShell script but uses a simple JSON state file in the user’s local share directory.

---

## 📂 `metaco.sh`

```bash
#!/bin/bash
# metaCo CLI Hook (Linux Bash)
# Minimal toggle script for metaCo extension

STATE_DIR="$HOME/.local/share/metaCo"
STATE_FILE="$STATE_DIR/state.json"

# Ensure directory exists
mkdir -p "$STATE_DIR"

# Check argument
if [ $# -ne 1 ]; then
  echo "Usage: $0 [on|off]"
  exit 1
fi

ACTION=$1

case "$ACTION" in
  on)
    echo '{"enabled": true}' > "$STATE_FILE"
    echo "metaCo toggled ON"
    ;;
  off)
    echo '{"enabled": false}' > "$STATE_FILE"
    echo "metaCo toggled OFF"
    ;;
  *)
    echo "Invalid action. Use 'on' or 'off'."
    exit 1
    ;;
esac
```

---

## 🔑 How It Works
- Run with `on` or `off`:  
  ```bash
  ./metaco.sh on
  ./metaco.sh off
  ```
- Writes toggle state (`enabled: true/false`) to `~/.local/share/metaCo/state.json`.  
- Extension’s background script can read this file to stay in sync with CLI toggles.  

---

## 📐 Next Steps
- Add **Mac AppleScript hook (`metaco.applescript`)** → writes to `~/Library/Application Support/metaCo/state.json`.  
- Update `background.js` to periodically check the state file or sync on startup.  
- Extend routing logic so toggling actually enables/disables query forwarding.  

---

Excellent — let’s complete the tri‑platform set with the **Mac AppleScript CLI hook (`metaco.applescript`)**. This will let metaCo be toggled from the terminal or via AppleScript automation on macOS.

---

## 📂 `metaco.applescript`

```applescript
-- metaCo CLI Hook (Mac AppleScript)
-- Minimal toggle script for metaCo extension

on run argv
    if (count of argv) is not 1 then
        display dialog "Usage: metaco.applescript [on|off]" buttons {"OK"} default button "OK"
        return
    end if

    set action to item 1 of argv
    set stateDir to (POSIX path of (path to library folder from user domain)) & "Application Support/metaCo/"
    set stateFile to stateDir & "state.json"

    -- Ensure directory exists
    do shell script "mkdir -p " & quoted form of stateDir

    if action is "on" then
        set jsonState to "{\"enabled\": true}"
        display dialog "metaCo toggled ON" buttons {"OK"} default button "OK"
    else if action is "off" then
        set jsonState to "{\"enabled\": false}"
        display dialog "metaCo toggled OFF" buttons {"OK"} default button "OK"
    else
        display dialog "Invalid action. Use 'on' or 'off'." buttons {"OK"} default button "OK"
        return
    end if

    -- Write JSON state to file
    do shell script "echo " & quoted form of jsonState & " > " & quoted form of stateFile
end run
```

---

## 🔑 How It Works
- Run from terminal:  
  ```bash
  osascript metaco.applescript on
  osascript metaco.applescript off
  ```
- Writes toggle state (`enabled: true/false`) to:  
  `~/Library/Application Support/metaCo/state.json`  
- Extension’s background script can read this file to stay in sync with CLI toggles.  
- Displays a simple dialog confirming the toggle state (optional UX flourish).  

---

## 📐 Next Steps
- Update `background.js` to check the state file at startup and align extension toggle with CLI state.  
- Add a lightweight polling or event listener so browser and CLI stay harmonized.  
- Extend routing logic so toggling actually enables/disables query forwarding across Copilot silos.  

---

Excellent — let’s wire up **`background.js`** so the extension stays in sync with the CLI state files across Windows, Linux, and Mac. This way, whether you toggle via popup or CLI, metaCo reflects the correct state.

---

## 📂 Updated `background.js`

```javascript
// metaCo background script
// Syncs toggle state between browser popup and CLI hooks

// Default state
let enabled = false;

// Listen for popup toggle messages
chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type === 'TOGGLE') {
    enabled = msg.enabled;
    console.log(`metaCo is now ${enabled ? 'ON' : 'OFF'}`);
    // Future: add routing logic here
  }
});

// Helper: read state file depending on OS
async function readStateFile() {
  // Detect platform
  const platform = await chrome.runtime.getPlatformInfo();
  let path;

  switch (platform.os) {
    case "win":
      path = `${process.env.LOCALAPPDATA}\\metaCo\\state.json`;
      break;
    case "linux":
      path = `${process.env.HOME}/.local/share/metaCo/state.json`;
      break;
    case "mac":
      path = `${process.env.HOME}/Library/Application Support/metaCo/state.json`;
      break;
    default:
      console.warn("Unsupported OS for CLI sync");
      return;
  }

  try {
    // Fetch state file via Native Messaging host (future integration)
    // Placeholder: simulate read
    console.log(`Checking state file at: ${path}`);
    // In real implementation, use native messaging to read file contents
  } catch (err) {
    console.error("Error reading state file:", err);
  }
}

// Periodically check CLI state file
setInterval(readStateFile, 5000);
```

---

## 🔑 What Changed
- **State sync**: background script now polls the CLI state file every 5 seconds.  
- **Cross‑platform paths**: Windows, Linux, Mac directories mapped.  
- **Future hook**: actual file read requires a **Native Messaging host** (Chromium extension security model). For now, it logs the path and simulates sync.  
- **Popup + CLI harmony**: toggling in either place will eventually converge once native messaging is wired.  

---

## 📐 Next Steps
1. Scaffold a **Native Messaging host** (small Node.js/Python app) to let the extension read/write the state file.  
2. Update `background.js` to parse JSON (`enabled: true/false`) and set extension state accordingly.  
3. Extend routing logic: when `enabled = true`, forward queries to Copilot silos; when `false`, block routing.  

---

This update makes metaCo’s **background script aware of CLI toggles** and sets the stage for full cross‑platform sync.  

Perfect — let’s scaffold the **Native Messaging host manifest** and a **sample Node.js host script**. This is the bridge that allows your Chromium extension (`background.js`) to securely read/write the CLI state files.

---

## 📂 Native Messaging Host Manifest

Save this as `com.metaco.host.json` in the appropriate directory:

- **Windows**:  
  `%LOCALAPPDATA%\Google\Chrome\User Data\NativeMessagingHosts\`  
  or `%LOCALAPPDATA%\Microsoft\Edge\User Data\NativeMessagingHosts\`

- **Linux**:  
  `~/.config/google-chrome/NativeMessagingHosts/`  
  or `~/.config/microsoft-edge/NativeMessagingHosts/`

- **Mac**:  
  `~/Library/Application Support/Google/Chrome/NativeMessagingHosts/`  
  or `~/Library/Application Support/Microsoft Edge/NativeMessagingHosts/`

```json
{
  "name": "com.metaco.host",
  "description": "metaCo Native Messaging Host",
  "path": "/absolute/path/to/metaco_host.js",
  "type": "stdio",
  "allowed_origins": [
    "chrome-extension://<YOUR_EXTENSION_ID>/"
  ]
}
```

🔑 Replace `<YOUR_EXTENSION_ID>` with the actual ID of your extension (visible in `chrome://extensions` after loading it).

---

## 📂 Sample Node.js Host Script (`metaco_host.js`)

```javascript
#!/usr/bin/env node

// metaCo Native Messaging Host
// Reads/writes state.json for CLI ↔ Extension sync

const fs = require('fs');
const os = require('os');
const path = require('path');

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
```

---

## 🔑 How It Works
- **Extension → Host**: Sends JSON messages (`{ type: "read" }` or `{ type: "write", data: {...} }`).  
- **Host → Extension**: Responds with JSON (`{ success: true, data: {...} }`).  
- **State file**: Stored in platform‑specific path, shared with CLI scripts.  
- **Security**: Only your extension ID is allowed to talk to the host.  

---

## 📐 Next Steps
1. Register the manifest in the correct NativeMessagingHosts directory.  
2. Update `background.js` to use `chrome.runtime.connectNative("com.metaco.host")`.  
3. Test round‑trip: toggle via CLI → extension reads state → logs ON/OFF.  

---

This gives metaCo a **secure bridge** between browser and CLI, completing the cross‑platform sync loop.  

I can scaffold the **extension → host messaging code** next (inside `background.js`) so you see how to call `connectNative` and exchange messages.
