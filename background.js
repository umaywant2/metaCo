// Load silo map config
let siloMap = {};

fetch(chrome.runtime.getURL("silo_map.json"))
  .then((response) => response.json())
  .then((data) => {
    siloMap = data;
    console.log("Silo map loaded:", siloMap);
  });

// Routing logic using silo_map.json
function routeQuery(query) {
  if (!enabled) {
    console.log("metaCo is OFF — query blocked.");
    return;
  }

  let matchedSilo = "Default Copilot";

  for (const [silo, keywords] of Object.entries(siloMap)) {
    for (const keyword of keywords) {
      if (query.toLowerCase().includes(keyword.toLowerCase())) {
        matchedSilo = silo;
        break;
      }
    }
    if (matchedSilo !== "Default Copilot") break;
  }

  forwardToSilo(matchedSilo, query);
}

function forwardToSilo(silo, query) {
  console.log(`Routing query "${query}" → ${silo}`);
  // Future: implement actual API call or silo integration
}
