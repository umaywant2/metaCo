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
