var port = chrome.extension.connect({
    name: 'forBackground'
});
var tabId = chrome.devtools.inspectedWindow.tabId;
chrome.devtools.network.onRequestFinished.addListener(function(request) {
    var url = request.request.url;
    var status = request.response.status;

    console.log('[url]:' + url);
    if (status == 404 && /\/\?\?/.test(url)) {
        var baseUrl = url.split("??")[0];
        var comboUrl = url.split("??")[1];
        var comboUrlList = comboUrl.split(",");
        var xhr = null;
        console.log('[404]:' + url);

        comboUrlList.forEach(function(item) {
            xhr = new XMLHttpRequest();
            xhr.open('get', baseUrl + item, true);
            xhr.onerror = function() {
                port.postMessage({tabId: tabId, url: baseUrl + item});
                console.log('[send]:' + tabId);
                console.log('[send]:' + baseUrl + item);
            };
            xhr.send(null);
        });
    }
});
