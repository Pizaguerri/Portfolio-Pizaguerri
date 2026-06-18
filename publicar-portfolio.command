#!/bin/bash
# ============================================================
# publicar-portfolio.command
# Doble-click (o invocar desde Obsidian) para abrir una ventana
# de Terminal visible que ejecuta sync-content.sh de forma
# interactiva (con sus prompts normales).
# ============================================================

osascript <<'APPLESCRIPT'
tell application "Terminal"
  activate
  do script "cd '/Users/pabloizaguerri/Library/Mobile Documents/com~apple~CloudDocs/Coding Room/Portfolio-Pizaguerri' && ./sync-content.sh"
end tell
APPLESCRIPT
