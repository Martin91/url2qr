'use strict';
(function () {
  var setQRCode = function(selector, url) {
    new QRCode(
      document.querySelector(selector),
      {
        text: url,
        colorDark: '#008080'
      }
    );
  };

  chrome.tabs.query({
    currentWindow: true,
    active: true
  }, function(tabs) {
    var original_url = tabs[0].url;
    var selector = '#url2qrcode_canavs_container';

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.weibo.com/2/short_url/shorten.json?source=482366427&url_long=" + original_url, true);
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4) {
        var canvasContainer = document.querySelector(selector);
        canvasContainer.innerHTML = "";

        var resp = JSON.parse(xhr.responseText);

        if (!resp.error) {
          var short_url = resp.urls[0].url_short;

          setQRCode(selector, short_url);

          var shortUrlInput = document.createElement("input");
          shortUrlInput.value = short_url;
          shortUrlInput.className = "short-url-input";
          canvasContainer.insertBefore(shortUrlInput, canvasContainer.firstChild);
        } else {
          setQRCode(selector, original_url);
        }
      }
    };
    xhr.send();
  });
})();