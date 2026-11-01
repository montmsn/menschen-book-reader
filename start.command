#!/bin/zsh
# Starts the Menschen reader: local server (with AI tutor) on port 8001 + opens the browser.
# Double-click in Finder, or run ./start.command in Terminal. Close the window (or Ctrl+C) to stop.

PORT=8001
DIR="$(cd "$(dirname "$0")" && pwd)"
URL="http://localhost:$PORT/reader.html"

if lsof -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then
  echo "Server läuft schon auf Port $PORT – öffne $URL"
  open "$URL"
  exit 0
fi

echo "Starte Menschen Reader auf $URL"
echo "Zum Beenden: dieses Fenster schließen oder Ctrl+C drücken."
(sleep 1 && open "$URL") &
exec python3 "$DIR/server.py" $PORT
