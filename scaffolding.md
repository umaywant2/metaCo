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
