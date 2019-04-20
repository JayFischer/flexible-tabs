chrome.runtime.onInstalled.addListener(function() {
  const flexTab = { title: "Flexible Tabs", id: "flexTabs" };
  const flexTabsChildren = [
    { title: "Close Tabs to the Right", id: "right" },
    { title: "Close Tabs to the Left", id: "left" },
    { title: "Close Tabs like Domain", id: "domain" },
    { title: "Close Other Tabs", id: "other" },
    { title: "Close Tab", id: "tab" }
  ];

  chrome.contextMenus.create(flexTab);
  flexTabsChildren.forEach(tab =>
    chrome.contextMenus.create({ parentId: flexTab.id, ...tab })
  );
});

const getActiveWindowTabs = callback => {
  chrome.windows.getCurrent({}, function(window) {
    chrome.tabs.query({ windowId: window.id }, function(tabs) {
      const activeTab = tabs.find(tab => tab.active === true);
      callback(tabs, activeTab);
    });
  });
};

const closeRight = () => {
  const tabs = getActiveWindowTabs(function(tabs, activeTab) {
    const tabsToRemove = tabs.slice(activeTab.index + 1).map(tab => tab.id);
    chrome.tabs.remove(tabsToRemove);
  });
};

const closeLeft = () => {
  const tabs = getActiveWindowTabs(function(tabs, activeTab) {
    const tabsToRemove = tabs.slice(0, activeTab.index).map(tab => tab.id);
    chrome.tabs.remove(tabsToRemove);
  });
};

const closeOther = () => {
  const tabs = getActiveWindowTabs(function(tabs, activeTab) {
    const tabsToRemove = tabs
      .filter(tab => tab.id !== activeTab.id)
      .map(tab => tab.id);
    chrome.tabs.remove(tabsToRemove);
  });
};

const closeTab = () => {
  const tabs = getActiveWindowTabs(function(tabs, activeTab) {
    chrome.tabs.remove(activeTab.id);
  });
};

chrome.contextMenus.onClicked.addListener(function(item, tab) {
  switch (item.menuItemId) {
    case "left":
      closeLeft();
      break;
    case "right":
      closeRight();
      break;
    case "other":
      closeOther();
      break;
    case "tab":
      closeTab();
      break;
    case "domain":
      closeDomain();
      break;
    default:
      return null;
  }
});
