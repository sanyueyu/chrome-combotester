chrome.extension.onMessage.addListener(function(message) {
    console.log('%c [chrome-combotester]:' + message, 'background: #222; color: #bada55')
});
