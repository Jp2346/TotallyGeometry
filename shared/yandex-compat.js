/*
  Stand-ins for the Yandex Games SDK helpers that some Unity games expect to find on the page.
  There are no ads, accounts or leaderboards here: each call answers the game the way the real
  SDK would for a signed-out player, and saves are kept in the browser's localStorage.
  The page must set window.myGameInstance to the Unity instance once the game has loaded.
*/

var YG_SAVE_KEY = "tg_yandex_saves";

function ygSend(method, value) {
  try {
    if (!window.myGameInstance) return;
    if (value === undefined) window.myGameInstance.SendMessage("YandexGame", method);
    else window.myGameInstance.SendMessage("YandexGame", method, value);
  } catch (error) {
    console.log(error);
  }
}

function PaintRBT() {}
function StaticRBTDeactivate() {}

/* ----- Player: signed out ----- */

function NotAuthorized() {
  ygSend("SetAuthorization", JSON.stringify({
    playerAuth: "rejected",
    playerName: "unauthorized",
    playerId: "",
    playerPhoto: "null"
  }));
}
function InitPlayer() { NotAuthorized(); }
function AuthorizationCheck() { NotAuthorized(); }
function OpenAuthDialog() { NotAuthorized(); }

/* ----- Purchases: none ----- */

function InitPayments() {}
function BuyPayments(id) { ygSend("OnPurchaseFailed", String(id)); }
function GetPayments() {
  ygSend("PaymentsEntries", JSON.stringify({
    id: [], title: [], description: [], imageURI: [], priceValue: [], purchased: []
  }));
}
function DeletePurchase() {}
function DeleteAllPurchases() {}

/* ----- Saves: kept in this browser ----- */

function SaveCloud(jsonData) {
  try {
    localStorage.setItem(YG_SAVE_KEY, JSON.stringify([jsonData]));
  } catch (error) {
    console.log(error);
  }
}
function LoadCloud() {
  var saved = null;
  try {
    saved = localStorage.getItem(YG_SAVE_KEY);
  } catch (error) {
    console.log(error);
  }
  ygSend("SetLoadSaves", saved || "noData");
}

/* ----- Leaderboards: empty ----- */

function InitLeaderboard() { ygSend("InitializedLB"); }
function SetLeaderboardScores() {}
function GetLeaderboardScores(nameLB) {
  ygSend("LeaderboardEntries", JSON.stringify({
    nameLB: nameLB,
    entries: "No data",
    rank: [], photo: [], playersName: [], scorePlayers: []
  }));
}
function EntriesLB() {}

/* ----- Ads: skipped ----- */

function FullscreenShow() {
  ygSend("OpenFullscreen");
  ygSend("CloseFullscreen");
}
function RewardedShow() { ygSend("ErrorVideo"); }
function StickyAdActivity() {}

/* ----- Environment ----- */

function LanguageRequest() { ygSend("SetLanguage", "en"); }
function RequestingEnvironmentData() {
  ygSend("SetEnvironmentData", JSON.stringify({
    language: "en",
    domain: "com",
    deviceType: "desktop",
    isMobile: false,
    isDesktop: true,
    isTablet: false,
    isTV: false,
    appID: "",
    browserLang: "en",
    payload: "",
    promptCanShow: false,
    reviewCanShow: false
  }));
}
function Review() {}
function PromptShow() {}
