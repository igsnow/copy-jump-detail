chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (location.host == 'detail.tmall.com') {
        // 用户停留在天猫商品详情页，则执行脚本将"立即购买"、"加入购物车按钮"隐藏，同时添加复制链接按钮
        hideNativeBtn()
    } else if (location.host == 'test.mvcb.qilie.biz' && location.hash == '#/') {
        // 在vcanbuy mall首页接受脚本消息执行复制链接到搜索框执行搜索操作
        if (request.cmd == 'jump') {
            console.log(request.value);
            if (!request.value) return;
            handleCopy(request.value);
            sendResponse('jump消息已收到！');
        }
    } else {
        console.log('不是脚本执行页面')
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

// 隐藏天猫商品详情页原生立即购买和加入购物车按钮
function hideNativeBtn() {
    let btn = document.createElement("div");
    btn.setAttribute("id", "toVcb");
    btn.style.background = "green";
    btn.style.borderRadius = '2px';
    btn.style.width = "178px";
    btn.style.height = "38px";
    btn.style.lineHeight = "38px";
    btn.style.textAlign = 'center';
    btn.style.fontFamily = 'Microsoft Yahei';
    btn.style.fontSize = '16px';
    btn.style.color = '#fff';
    btn.style.zIndex = "9999999999";
    btn.style.cursor = 'pointer';
    btn.innerHTML = '复制链接';
    // 隐藏原生按钮，插入自定义按钮
    let nativeBtn = document.getElementsByClassName('tb-action tm-clear')[0];
    let ele1 = document.getElementsByClassName('tb-btn-buy tb-btn-sku')[0];
    let ele2 = document.getElementsByClassName('tb-btn-basket tb-btn-sku')[0];
    let ele3 = document.getElementsByClassName('tb-btn-add tb-btn-sku tb-hidden')[0];
    ele1.style.display = 'none';
    ele2.style.display = 'none';
    ele3.style.display = 'none';
    nativeBtn.appendChild(btn);

    let pageUrl = location.href;
    // 谷歌插件的ID
    let targetExtensionId = 'kgfophobpemegppibmgjaejdijffafgf';
    // 点击复制链接按钮跳转到vcanbuy mall
    $('#toVcb').click(function () {
        chrome.runtime.sendMessage(targetExtensionId, {
            url: pageUrl
        }, function (res) {
            console.log(res);
        });
    })
}





