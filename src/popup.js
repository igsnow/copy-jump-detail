// 控制扩展程序的js，比如点击插件开始按钮
let bg = chrome.extension.getBackgroundPage();
$(function () {
    let pageUrl = '';
    bg && bg.getCurrentTabUrl(url => {
        pageUrl = url
    });

    $("#btn").click(function () {
        chrome.runtime.sendMessage({url: pageUrl}, function (response) {
            console.log(response);
        });
        bg && bg.clearData()
    });
});
