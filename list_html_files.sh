#!/bin/bash

# Pfad zum Ordner public
directory="public"

# Prüfen, ob der Ordner existiert
if [ ! -d "$directory" ]; then
  echo "Der Ordner '$directory' existiert nicht."
  exit 1
fi

# Schleife durch alle HTML-Dateien im Ordner und Unterordner
find "$directory" -type f -name "*.html" | while read -r file; do
  # Ausgabe des Dateinamens als Überschrift
  echo "==========================="
  echo "Datei: $file"
  echo "==========================="

  # Ausgabe des Inhalts der Datei
  cat "$file"
  echo
  echo
done
