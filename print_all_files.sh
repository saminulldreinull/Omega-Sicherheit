#!/bin/bash

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

# Wechseln Sie in das src-Verzeichnis
cd src

# Starten Sie den Prozess von src
print_files "."

# Zusätzliche Dateien ausgeben
additional_files=(
  "../public/contact.html"
  "../public/css/contact.css"
  "../public/js/contactForm.js"
)

for file in "${additional_files[@]}"; do
  if [ -f "$file" ]; then
    echo "---- Inhalt von: $file ----"
    cat "$file"
    echo -e "\n\n"
  else
    echo "Datei $file nicht gefunden."
  fi
done
