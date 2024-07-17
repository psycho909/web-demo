let adBlockDetected = false;
const blockedResources = new Set(); // 用於儲存被阻擋的資源名稱

// 資源陣列
const resources = [
    { name: "fbAD", url: "https://connect.facebook.net/en_US/fbevents.js" },
    { name: "googleAD", url: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js" },
    { name: "fbIframe", url: "https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Ffacebook&tabs=timeline" },
];

function checkAdBlock(resource) {
    return fetch(new Request(resource.url, { method: "HEAD", mode: "no-cors" })).catch(function (error) {
        adBlockDetected = true; // 假設捕獲到錯誤表示有廣告阻擋
        blockedResources.add(resource.name); // 將被阻擋的資源名稱添加到集合中
    });
}

function detectAdBlock() {
    return Promise.all(resources.map(checkAdBlock)).then(function () {
        window.blockedType = {
            any: adBlockDetected,
            fbAD: blockedResources.has("fbAD"),
            googleAD: blockedResources.has("googleAD"),
            fbIframe: blockedResources.has("fbIframe"),
        };
    });
}
