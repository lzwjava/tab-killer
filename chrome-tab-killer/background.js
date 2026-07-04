// Tab Killer — MV3 service worker
importScripts('js/lib/underscore.js');

const DEFAULTS = {
  maxTabs: 15,
  whiteList: ['chrome://*']
};

let settings = { ...DEFAULTS };
let tabUpdateTimes = {};

// Load persisted settings on startup
chrome.storage.sync.get(DEFAULTS, (items) => {
  Object.assign(settings, items);
});

// React to settings changes made in the popup
chrome.storage.onChanged.addListener((changes) => {
  for (const key of Object.keys(DEFAULTS)) {
    if (changes[key]) {
      settings[key] = changes[key].newValue;
    }
  }
});

// --- Tab event hooks ---

chrome.tabs.onCreated.addListener((tab) => {
  touchTab(tab.id);
  checkToClose();
});

chrome.tabs.onRemoved.addListener((tabId) => {
  delete tabUpdateTimes[tabId];
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (tab.url) touchTab(tabId);
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  touchTab(activeInfo.tabId);
});

function touchTab(tabId) {
  tabUpdateTimes[tabId] = Date.now();
}

function isWhitelisted(url) {
  if (!url) return false;
  return settings.whiteList.some((pattern) => url.indexOf(pattern) !== -1);
}

function checkToClose() {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    if (tabs.length <= settings.maxTabs) return;

    // Only consider non-whitelisted tabs for killing
    const candidates = tabs.filter((t) => !isWhitelisted(t.url));
    const excess = candidates.length - settings.maxTabs;
    if (excess <= 0) return;

    // Sort by last activity — oldest first
    const sorted = _.sortBy(candidates, (t) => tabUpdateTimes[t.id] || 0);

    for (let i = 0; i < excess; i++) {
      chrome.tabs.remove(sorted[i].id);
    }
  });
}