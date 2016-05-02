chrome.extension.onConnect.addListener(function(port) {
    port.onMessage.addListener(function (message) {
        console.log(message);
        chrome.tabs.sendMessage(message.tabId, message.url);
    });
});
