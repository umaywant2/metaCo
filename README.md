# 🌐 metaCo

A meta service for routing 'siloed' Copliot AI queries

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Built for Chromium](https://img.shields.io/badge/Chromium-Compatible-blue.svg)]()
[![Status: Prototype](https://img.shields.io/badge/Status-Prototype-orange.svg)]()

> **metaCo** is a minimal meta‑service for routing Copilot queries across silos.  
> Lightweight, user‑focused, and remix‑ready.

---

## 🎯 Purpose
- Help users **bridge Copilot silos** (Edge, GitHub, Dynamics, etc.) with one router.  
- Provide a **minimal footprint**: toggleable, no bloat.  
- Stay **developer‑friendly**: clean scaffolding, easy to fork or extend.  

---

## 🛠️ Features
- **Minimal footprint**: On/Off toggle, no persistent background services.  
- **User‑focused**: simple browser popup + CLI hooks.  
- **Cross‑platform**: works on any Chromium browser (Edge, Chrome, Brave, Vivaldi).  
- **Native hooks**: PowerShell (Windows), Bash/systemd (Linux), AppleScript (Mac).  
- **Transparent logs**: every routed query visible to the user.  

---

## 📐 Architecture
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

---

## 🚀 Getting Started
### Prerequisites
- Chromium browser (Edge, Chrome, Brave, Vivaldi).  
- Node.js + npm (for building).  
- Optional: PowerShell / Bash / AppleScript for native hooks.  

### Installation
```bash
git clone https://github.com/umaywant2/metaCo.git
cd metaCo
npm install
```

Load the extension in your browser’s **Developer Mode**.  

---

## ⚡ Usage
- Toggle **On/Off** from the browser popup.  
- Use CLI hooks:  
  ```bash
  metaco on
  metaco off
  ```
- Watch logs for routed queries.  

---

## 🤝 Contributing
metaCo is designed to be **lean and remixable**.  
- Fork the repo.  
- Add new silo connectors.  
- Submit PRs with clean, modular code.  

---

## 📜 License
MIT License — open remix culture encouraged.

---

## 🧭 Roadmap
- [ ] Minimal extension manifest  
- [ ] On/Off toggle UI  
- [ ] Basic routing logic  
- [ ] Native hooks per OS  
- [ ] Publish v0.1 prototype  

---

## 💡 Why metaCo?
Because Copilot silos fragment user experience.  
metaCo unifies them — **minimal, user‑focused, and developer‑friendly.**
extend the repo’s polish.

---
