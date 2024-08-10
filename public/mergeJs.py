import os

# Pfad zum Ordner mit den Dateien
ordner_pfad = 'js'

# Name der Ausgabedatei
ausgabe_datei = 'kombiniert.js'

# Öffne die Ausgabedatei im Schreibmodus
with open(ausgabe_datei, 'w', encoding='utf-8') as ausgabe:
    # Durchlaufe alle Dateien im Ordner
    for datei_name in os.listdir(ordner_pfad):
        # Überprüfe, ob es sich um eine Datei handelt (keinen Ordner)
        datei_pfad = os.path.join(ordner_pfad, datei_name)
        if os.path.isfile(datei_pfad):
            try:
                # Schreibe einen Kommentar mit dem Dateinamen in die Ausgabedatei
                ausgabe.write(f'// Inhalt von: {datei_name}\n')
                # Öffne die aktuelle Datei im Binärmodus
                with open(datei_pfad, 'rb') as datei:
                    inhalt = datei.read()
                    # Versuche, den Inhalt als UTF-8 zu dekodieren
                    inhalt = inhalt.decode('utf-8')
                    # Schreibe den Inhalt der Datei in die Ausgabedatei
                    ausgabe.write(inhalt)
                    # Füge eine Leerzeile nach dem Inhalt hinzu
                    ausgabe.write('\n\n')
            except UnicodeDecodeError:
                print(f"Datei {datei_name} konnte nicht als UTF-8 dekodiert werden und wurde übersprungen.")

print(f'Alle Dateien wurden erfolgreich in {ausgabe_datei} zusammengefasst.')
