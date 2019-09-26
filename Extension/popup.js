let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function (data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
})

var data;
changeColor.onclick = function (element) {
    var bg = chrome.extension.getBackgroundPage();
    var clipBoard = bg.getClipboard();
    data = clipBoard.split(/[\r\n]+/);

    bg.console.log("Hi: " + data);
    
    let color = element.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.executeScript(
            tabs[0].id,
            { code: 'document.body.style.backgroundColor = "' + color + '";' });
    });
};