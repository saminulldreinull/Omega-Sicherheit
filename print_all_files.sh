#!/bin/bash

# Wechseln Sie in das src-Verzeichnis
cd src

# Funktion zum Durchlaufen der Verzeichnisse und Ausgeben der Datei-Inhalte
function print_files {
  for file in "$1"/*; do
    if [ -d "$file" ]; then
      # Wenn es ein Verzeichnis ist, rekursiv aufrufen
      print_files "$file"
    else
      # Wenn es eine Datei ist, den Inhalt ausgeben
      echo "---- Inhalt von: $file ----"
      cat "$file"
      echo -e "\n\n"
    fi
  done
}

# Starten Sie den Prozess von src
print_files "."
