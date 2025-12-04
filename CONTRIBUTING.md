# 📜 metaCo Routing Documentation

## 🎯 Purpose
metaCo routes user queries across Copilot silos using a **keyword → silo map**.  
Developers can extend routing by editing a simple JSON file, without touching core code.

---

## 📂 File: `silo_map.json`

### Format
```json
{
  "Silo Name": [
    "keyword1",
    "keyword2",
    "keyword3"
  ],
  "Another Silo": [
    "keywordA",
    "keywordB"
  ]
}
```

- **Keys**: Human‑readable silo names (e.g., `"GitHub Copilot"`).  
- **Values**: Array of keywords that trigger routing to that silo.  
- **Default Copilot**: Always included as fallback.  

---

## 🛠️ Adding a New Connector

1. **Edit `silo_map.json`**  
   Add a new silo entry with keywords:
   ```json
   "Slack Copilot": [
     "chat",
     "slack",
     "message",
     "channel"
   ]
   ```

2. **Implement Connector (Optional)**  
   Extend `forwardToSilo()` in `background.js`:
   ```javascript
   function forwardToSilo(silo, query) {
     console.log(`Routing query "${query}" → ${silo}`);
     if (silo === "Slack Copilot") {
       // Example: send query to Slack API
       // fetch("https://slack.com/api/copilot", { method: "POST", body: JSON.stringify({ query }) });
     }
   }
   ```

3. **Test**  
   - Toggle metaCo ON.  
   - Enter a query containing your keywords.  
   - Confirm routing logs show your new silo.  

---

## 📐 Example Connectors

- **GitHub Copilot** → `"code"`, `"repo"`, `"commit"`.  
- **Edge Copilot** → `"doc"`, `"write"`, `"summarize"`.  
- **Dynamics Copilot** → `"crm"`, `"sales"`, `"pipeline"`.  
- **Slack Copilot** → `"chat"`, `"slack"`, `"message"`.  
- **Excel Copilot** → `"spreadsheet"`, `"excel"`, `"formula"`.  

---

## 🚀 Developer Guidelines
- Keep keywords **short and lowercase**.  
- Avoid overlap (e.g., `"write"` should not appear in multiple silos).  
- Test routing after edits.  
- Submit PRs with updated `silo_map.json` + connector logic if needed.  

---

## 📌 Roadmap
- Hot‑reload `silo_map.json` so developers can test changes instantly.  
- Add modular connector files (`connectors/github.js`, `connectors/slack.js`).  
- Support regex or advanced intent detection modules.  

---

This documentation makes metaCo **developer‑friendly and remix‑ready**: anyone can add a silo in minutes, without touching core routing logic.

---
