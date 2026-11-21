/*
  Stand-ins for the helper functions that Unity WebGL games expect to find on the page.
  Game pages load this one file instead of Firebase and the original ad code.
  If a game says "Can't find variable: something", add a function with that name here.
*/

/* ----- Sign-in: guests only ----- */

function initializeFireBase() {}

function firebaseLogin(providerName, successCallback, errorCallback) {
  if (providerName === "anonymous") {
    if (successCallback) successCallback({ token: "", displayName: "guest" });
    return;
  }
  if (errorCallback) errorCallback("Sign-in isn't available on this site.");
}

function firebaseLogout() {}

function getCurrentUserDisplayName() {
  return "";
}

function retrieveIdToken(successCallback, errorCallback) {
  if (errorCallback) errorCallback("User is null");
}

/* ----- Saved data: not stored ----- */

function initializeFirestore() {}
function addDocument() {}
function setDocument() {}
function updateDocument() {}
function deleteDocument() {}
function getDocument() {}

/* ----- Ad breaks: skipped straight to "finished" ----- */

function showAds() {}

function requestNewAd() {
  unityAdFinishedCallback();
}

function unityAdFinishedCallback() {
  try {
    if (window.gameInstance) window.gameInstance.SendMessage("AdsManager", "OnWebCallback");
  } catch (error) {
    console.log(error);
  }
}
