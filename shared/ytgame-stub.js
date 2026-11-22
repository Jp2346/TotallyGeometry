/*
  A local stand-in for the YouTube Playables SDK (window.ytgame).
  Games built for YouTube Playables call it for saves, scores, audio and pause events. Outside
  YouTube there is nothing to answer, so this version replies straight away instead of waiting
  for a host page that doesn't exist, and keeps saves in this browser's localStorage.
  Load it BEFORE any <base> tag so its path resolves to this site.
*/
(function () {
  var SAVE_KEY = "tg_ytgame_save";

  function none() {}
  function unsubscribe() { return none; }
  function done() { return Promise.resolve(); }

  var AdResult = { UNKNOWN: 0, SHOWED: 1, DISMISSED: 2, REJECTED: 3 };
  var SdkErrorType = { UNKNOWN: 0, API_UNAVAILABLE: 1, INVALID_PARAMS: 2, SIZE_LIMIT_EXCEEDED: 3 };

  function SdkError(errorType, message) {
    var error = new Error(message);
    error.errorType = errorType;
    error.name = "SDK_ERROR";
    return error;
  }

  window.ytgame = {
    SDK_VERSION: "local-stub",
    IN_PLAYABLES_ENV: false,
    SdkError: SdkError,
    SdkErrorType: SdkErrorType,

    game: {
      firstFrameReady: none,
      gameReady: none,
      saveData: function (data) {
        try { localStorage.setItem(SAVE_KEY, String(data)); } catch (error) { console.log(error); }
        return done();
      },
      loadData: function () {
        var saved = "";
        try { saved = localStorage.getItem(SAVE_KEY) || ""; } catch (error) { console.log(error); }
        return Promise.resolve(saved);
      },
      onGameDataAvailable: unsubscribe,
      shareInviteCode: done
    },

    engagement: {
      sendScore: done,
      openYTContent: done
    },

    system: {
      isAudioEnabled: function () { return true; },
      onAudioEnabledChange: function (callback) {
        setTimeout(function () { callback(true); }, 0);
        return none;
      },
      onPause: unsubscribe,
      onResume: unsubscribe,
      getLanguage: function () { return Promise.resolve("en"); }
    },

    health: {
      logError: none,
      logWarning: none
    },

    ads: {
      AdResult: AdResult,
      requestAd: function () { return Promise.resolve(AdResult.UNKNOWN); }
    }
  };
})();
