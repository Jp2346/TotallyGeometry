# TotallyGeometry

## Adding a game

1. **Make a folder** for it: `games/<id>/` (lowercase, hyphens, e.g. `games/slope/`).
2. **Put the game's page in it as `index.html`**, with any files it needs next to it.
   - **Plain HTML5 game:** copy its files in. Rename its main page to `index.html`.
   - **Flash game:** copy `games/raft-wars/index.html`, change the `<title>` and the `.swf` file name, and drop the `.swf` in the folder.
   - **Unity WebGL game:** copy `games/1v1-lol/index.html` and swap in the new game's title and loader URLs. If the game came with Firebase, login or ad code, delete all of it (the `firebase` and `login` script tags, `initializeFireBase();` and the ad functions) and keep the one line `<script src="../../shared/unity-compat.js"></script>` instead. If a game says "Can't find variable: something", add a function with that name to `shared/unity-compat.js`.
   - **YouTube Playables game** (Defold build with `ytgame.js`, `loader.js`, `yt-functions.js`): copy `games/hill-climb-racing/index.html`. It loads `shared/ytgame-stub.js` instead of the YouTube SDK.
   - **Google Sites code** (starts with `<Module>` and has `<![CDATA[`): the game is the HTML between `<![CDATA[` and `]]>`. Use only that part.
3. **Add a thumbnail** at `images/thumbs/<id>.jpg` (600 x 450; a .png works too if you change the path in `games.json`).
4. **Add an entry to `games.json`**:
   ```json
   {
     "id": "my-game",
     "title": "My Game",
     "category": "Action",
     "thumbnail": "images/thumbs/my-game.jpg",
     "path": "games/my-game/index.html",
     "width": 800,
     "height": 600
   }
   ```
   - `category` is `Action`, `Puzzle` or `Arcade`.
   - `width` and `height` are the game's shape. The player frame matches it.
5. Commit and wait a couple of minutes for GitHub Pages to update.

File and folder names are case-sensitive on GitHub Pages.

## Debugging a game

A game page can load `shared/diagnostics.js` (add `<script src="../../shared/diagnostics.js"></script>` at the top of its `<head>`). If something fails, a red panel appears at the bottom of the game frame listing the failed files or errors. It stays hidden when everything works.


## Games added in this update

- Snow Rider 3D
- Retro Bowl
- Duck Life 5 (official Ruffle; `dlife.swf` loaded from a pinned CDN commit)
- Baldi's Basics

These game pages load their game engines/assets from the CDN URLs in the supplied HTML. They therefore need an internet connection and may stop working if those third-party files are removed or changed. Local SVG placeholder thumbnails were added for the new games; replace them with screenshots whenever you have them.
