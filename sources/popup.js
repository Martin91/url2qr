'use strict';
(function () {
  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(tabs) {
    new QRCode(
      document.getElementById('url2qrcode_canavs_container'),
      {
        text: tabs[0].url,
        colorDark: '#008080'
      }
    );
  });
})();
