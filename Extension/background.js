// Set up the background page.
bg = chrome.extension.getBackgroundPage();
bg.document.body.innerHTML = "";

var helperTextArea = bg.document.createElement("textarea");
helperTextArea.id = "sandbox";
document.body.appendChild(helperTextArea);

chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({color: '#3aa757'}, function() {
      console.log('The color is green.');
    });
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules([{
        conditions: [new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostEquals: 'developer.chrome.com'},
        })
        ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      }]);
    });
  });

// Returns clipboard value
function getClipboard() {
    var result = '';
    var sandbox = document.getElementById('sandbox');
    sandbox.value = '';
    sandbox.select();
    if (document.execCommand('paste')) {
        result = sandbox.value;
        //console.log('got value from sandbox: ' + result);
    }
    sandbox.value = '';
    return result;
}