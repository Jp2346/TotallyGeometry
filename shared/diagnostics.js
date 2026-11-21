/*
  Temporary error panel for game pages. It stays hidden unless something goes wrong,
  then lists what failed at the bottom of the game frame, so a problem can be read off the screen.
  Add <script src="../../shared/diagnostics.js"></script> at the top of a game page to use it.
  Set window.TG_DEBUG = false before it loads to turn it off.
*/
(function () {
  if (window.TG_DEBUG === false) return;

  var panel = null;
  var ignore = /service ?worker/i;

  function show(text) {
    if (ignore.test(text)) return;
    if (!document.body) {
      document.addEventListener("DOMContentLoaded", function () { show(text); });
      return;
    }
    if (!panel) {
      panel = document.createElement("pre");
      panel.setAttribute("role", "alert");
      panel.style.cssText =
        "position:fixed;left:0;right:0;bottom:0;z-index:99999;max-height:50%;overflow:auto;" +
        "margin:0;padding:12px 14px;background:rgba(13,16,32,.96);color:#ff9c8f;" +
        "font:12px/1.5 ui-monospace,Menlo,Consolas,monospace;white-space:pre-wrap;word-break:break-all";
      panel.textContent = "This game hit a problem:\n";
      document.body.appendChild(panel);
    }
    if (panel.textContent.indexOf(text) === -1) panel.textContent += "\n" + text;
  }

  window.tgReport = show;

  // Pages call this if the game still hasn't started after a while (and set window.tgLoaded = true when it has).
  window.tgWatchdog = function (seconds, message) {
    setTimeout(function () {
      if (!window.tgLoaded) show("Still not started after " + seconds + " seconds. " + message);
    }, seconds * 1000);
  };

  // Scripts and stylesheets that fail to load, and JavaScript errors.
  window.addEventListener("error", function (e) {
    var t = e.target;
    if (t && (t.tagName === "SCRIPT" || t.tagName === "LINK")) show("Failed to load: " + (t.src || t.href));
    else show("Error: " + (e.message || "unknown error"));
  }, true);

  window.addEventListener("unhandledrejection", function (e) {
    var r = e.reason;
    show("Error: " + ((r && r.message) || r));
  });

  // Game files that the page requests while loading (data, images and so on).
  var open = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function (method, url) {
    var self = this;
    this.addEventListener("loadend", function () {
      if (self.status === 0 || self.status >= 400) {
        show("Request failed (" + (self.status || "blocked") + "): " + url);
      }
    });
    return open.apply(this, arguments);
  };

  if (window.fetch) {
    var nativeFetch = window.fetch;
    window.fetch = function (input) {
      var url = typeof input === "string" ? input : (input && input.url);
      return nativeFetch.apply(this, arguments).then(function (response) {
        if (!response.ok) show("Request failed (" + response.status + "): " + url);
        return response;
      }, function (error) {
        show("Request blocked: " + url);
        throw error;
      });
    };
  }
})();
