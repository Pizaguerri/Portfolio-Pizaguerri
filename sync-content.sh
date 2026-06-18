#!/bin/bash

# ============================================================
# sync-content.sh
# Sincroniza contenido desde Obsidian (carpeta "Portfolio Publicar")
# hacia el repo Hugo (content/), permite previsualizar con
# hugo server, y hace commit + push a Codeberg si todo está bien.
# ============================================================

# --- CONFIGURA ESTAS DOS RUTAS ANTES DE USAR ---
OBSIDIAN_SOURCE="/Users/pabloizaguerri/Library/Mobile Documents/iCloud~md~obsidian/Documents/Pizaguerri/03 Projectes/Fotografia/Portfolio Publicar"
HUGO_REPO="/Users/pabloizaguerri/Library/Mobile Documents/com~apple~CloudDocs/Coding Room/Portfolio-Pizaguerri"
# -------------------------------------------------

CONTENT_DEST="$HUGO_REPO/content"

echo "📂 Origen (Obsidian):  $OBSIDIAN_SOURCE"
echo "📂 Destino (Hugo):     $CONTENT_DEST"
echo ""

if [ ! -d "$OBSIDIAN_SOURCE" ]; then
  echo "❌ No se encuentra la carpeta de Obsidian. Revisa OBSIDIAN_SOURCE en el script."
  exit 1
fi

if [ ! -d "$HUGO_REPO" ]; then
  echo "❌ No se encuentra el repo Hugo. Revisa HUGO_REPO en el script."
  exit 1
fi

echo "🔄 Copiando contenido de Obsidian a content/ ..."
# rsync: copia, actualiza, y borra en destino lo que ya no exista en origen
# --delete hace que sea un mirror exacto de Obsidian -> Hugo
rsync -av --delete "$OBSIDIAN_SOURCE/" "$CONTENT_DEST/"

echo ""
echo "✅ Contenido sincronizado."
echo ""

cd "$HUGO_REPO"

# Mostrar qué ha cambiado antes de hacer nada más
echo "📋 Cambios detectados en el repo:"
git status --short content/
echo ""

read -p "¿Quieres previsualizar con 'hugo server' antes de publicar? (s/n): " PREVIEW

if [ "$PREVIEW" = "s" ] || [ "$PREVIEW" = "S" ]; then
  echo ""
  echo "🌐 Lanzando hugo server en http://localhost:1313"
  echo "   Cuando termines de revisar, pulsa Ctrl+C para continuar."
  echo ""

  # Lanza hugo server en background para poder abrir el navegador después
  hugo server &
  HUGO_PID=$!

  # Captura Ctrl+C: mata solo el proceso de hugo, no el script entero
  trap "kill $HUGO_PID 2>/dev/null" INT

  # Espera un par de segundos a que el servidor arranque antes de abrir el navegador
  sleep 2
  open "http://localhost:1313"

  # Espera a que el usuario corte el servidor con Ctrl+C
  wait $HUGO_PID 2>/dev/null

  # Restaura el comportamiento normal de Ctrl+C para el resto del script
  trap - INT

  echo ""
  echo "🛑 Servidor detenido."
fi

echo ""
read -p "¿Quieres hacer commit y push a Codeberg ahora? (s/n): " CONFIRM

if [ "$CONFIRM" != "s" ] && [ "$CONFIRM" != "S" ]; then
  echo "🚫 Cancelado. El contenido ya está copiado en content/, pero no se ha hecho commit."
  exit 0
fi

read -p "Mensaje de commit (deja vacío para usar uno por defecto): " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
  COMMIT_MSG="content: sync desde Obsidian $(date +'%Y-%m-%d %H:%M')"
fi

git add content/
git commit -m "$COMMIT_MSG"
git push codeberg main

echo ""
echo "🚀 Push realizado. El deploy en Codeberg Actions debería arrancar en breve."