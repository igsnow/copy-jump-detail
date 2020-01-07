// 常驻页面，存放一些全局的通用方法
window.data = [];

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}

// 获取当前选项卡url
function getCurrentTabUrl(callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].url : null);
    });
}

// 给content.js发送消息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    sendResponse('OK!');
    // let url = 'http://test.mvcb.qilie.biz';
    let url = 'http://test.mvcb.qilie.biz';
    chrome.tabs.create({url: url}, function (tab) {
        window.data.push(request);
    });
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // 当页面加载完时，才能操作dom
    if (changeInfo.status == 'complete') {
        chrome.tabs.query({}, function (tabs) {
            tabs.forEach(function (item) {
                if (item.id === tabId) {
                    chrome.tabs.sendMessage(tabId, {
                        cmd: 'jump',
                        value: window.data && window.data[0] && window.data[0].url
                    });
                    // 当首页接收到的消息被消费后清空数据，便面回到首页后再次跳转
                    clearData()
                }
            });
        })
    }
});

// 清空data
function clearData() {
    window.data = []
}















