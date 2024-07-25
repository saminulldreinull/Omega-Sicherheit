#!/bin/bash

# Funktion zum rekursiven Auflisten der Dateien und Inhalte
list_files_and_contents() {
    local directory="$1"
    
    # Durchlaufe alle Dateien und Verzeichnisse im aktuellen Verzeichnis
    for entry in "$directory"/*
    do
        if [ -d "$entry" ]; then
            # Wenn es ein Verzeichnis ist, rufe die Funktion rekursiv auf
            list_files_and_contents "$entry"
        elif [ -f "$entry" ]; then
            # Wenn es eine Datei ist, gib den Dateinamen und den Inhalt aus
            echo "Datei: $entry"
            cat "$entry"
            echo ""
        fi
    done
}

# Startverzeichnis setzen (src)
start_directory="src"

# Auflisten der Dateien und Inhalte im Startverzeichnis
list_files_and_contents "$start_directory"
