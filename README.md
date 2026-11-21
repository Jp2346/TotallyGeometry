# TotallyGeometry

## Adding a game

1. **Make a folder** for it: `games/<id>/` (lowercase, hyphens, e.g. `games/slope/`).
2. **Put the game's page in it as `index.html`**, with any files it needs next to it.
   - **Plain HTML5 game:** copy its files in. Rename its main page to `index.html`.
   - **Flash game:** copy `games/raft-wars/index.html`, change the `<title>` and the `.swf` file name, and drop the `.swf` in the folder.
   - **Unity WebGL game:** copy `games/1v1-lol/index.html` and swap in the new game's title and loader URLs.
   - **Google Sites code** (starts with `<Module>` and has `<![CDATA[`): the game is the HTML between `<![CDATA[` and `]]>`. Use only that part.
3. **Add a thumbnail** at `images/thumbs/<id>.png` (600 x 450).
4. **Add an entry to `games.json`**:
   ```json
   {
     "id": "my-game",
     "title": "My Game",
     "category": "Action",
     "thumbnail": "images/thumbs/my-game.png",
     "path": "games/my-game/index.html",
     "width": 800,
     "height": 600
   }
   ```
   - `category` is `Action`, `Puzzle` or `Arcade`.
   - `width` and `height` are the game's shape. The player frame matches it.
5. Commit and wait a couple of minutes for GitHub Pages to update.

File and folder names are case-sensitive on GitHub Pages.
