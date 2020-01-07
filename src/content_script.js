chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (location.host == 'test.mvcb.qilie.biz' && location.hash == '#/') {
        if (request.cmd == 'src') {
            console.log(request.value);
            if (!request.value) return;
            handleCopy(request.value);
            sendResponse('jump消息已收到！');
        }
    } else {
        console.log('不是mall首页')
    }
});

function handleCopy(val) {
    let ipt = $('.top-banner input');
    let btn = $('.top-banner .btn');
    if (ipt && ipt[0]) {
        ipt[0].value = val;
        // 避免直接赋值无法触发v-model的bug
        ipt[0].dispatchEvent(new Event('input'));
    }
    if (btn && btn[0]) {
        btn[0].click();
    }
}






