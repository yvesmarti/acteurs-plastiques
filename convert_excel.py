"""
convert_excel.py
================
Convertit le fichier Excel "acteurs_plastiques_normandie.xlsx" en JSON
pour alimenter la carte HTML index.html.

Format attendu de l'Excel :
  - Feuille "Sites"
  - Colonnes infos : Nom, Ville, Code_postal, Adresse, Latitude, Longitude,
                     Telephone, Email, Site_web, Description
  - Colonnes "Type d'acteur" : Trieur | Broyeur | Recycleur | Négociant |
                                Plasturgiste | Autres | Collecteur
  - Colonnes "Type de résine" : PA | PEBD | PEHD | PP | PET | PS | PSE |
                                  PVC | PUR | PC | PABS | Autre
  → Mettre "x" (ou "X") dans une colonne pour l'activer.

Usage :
    python convert_excel.py acteurs_plastiques_normandie.xlsx
    python convert_excel.py acteurs_plastiques_normandie.xlsx data/acteurs.json
    python convert_excel.py acteurs_plastiques_normandie.xlsx --no-geocode

Dépendances : pip install pandas openpyxl requests
"""

import sys
import json
import requests
import pandas as pd
from pathlib import Path

# ── Colonnes d'information de base ───────────────────────────────────────────
INFO_FIELDS = {
    "Nom":         "nom",
    "Ville":       "commune",
    "Code_postal": "code_postal",
    "Adresse":     "adresse",
    "Latitude":    "lat",
    "Longitude":   "lng",
    "Telephone":   "telephone",
    "Email":       "email",
    "Site_web":    "site_web",
    "Description": "description",
}

# ── Colonnes catégories ───────────────────────────────────────────────────────
# Clé JSON "type_acteur" → valeurs possibles (une colonne par valeur)
ACTEUR_COLS  = ["Trieur", "Broyeur", "Recycleur", "Négociant",
                "Plasturgiste", "Autres", "Collecteur"]

# Clé JSON "type_resine" → valeurs possibles (une colonne par valeur)
RESINE_COLS  = ["PA", "PEBD", "PEHD", "PP", "PET", "PS",
                "PSE", "PVC", "PUR", "PC", "PABS", "Autre"]


# ── Géocodage BAN (adresses françaises) ─────────────────────────────────────
def geocode_ban(adresse="", commune="", code_postal=""):
    query = " ".join(filter(None, [adresse, code_postal, commune])).strip()
    if not query:
        return None, None
    try:
        r = requests.get("https://api-adresse.data.gouv.fr/search/",
                         params={"q": query, "limit": 1}, timeout=6)
        r.raise_for_status()
        feats = r.json().get("features", [])
        if feats:
            lon, lat = feats[0]["geometry"]["coordinates"]
            return round(lat, 6), round(lon, 6)
    except Exception as e:
        print(f"      ⚠ BAN : {e}")
    return None, None


def is_checked(val):
    """Retourne True si la cellule contient 'x' ou 'X' (cochée)."""
    if pd.isna(val):
        return False
    return str(val).strip().lower() == "x"


def clean_str(val):
    if pd.isna(val):
        return ""
    s = str(val).strip()
    return "" if s.lower() in ("nan", "none") else s


# ── Conversion principale ─────────────────────────────────────────────────────
def excel_to_json(excel_path: str, output_path: str = "data/acteurs.json",
                  do_geocode: bool = True):

    print(f"\n📂 Lecture de : {excel_path}")
    df = pd.read_excel(excel_path, sheet_name="Sites", header=1, dtype=str)
    print(f"   {len(df)} lignes  |  colonnes : {list(df.columns)}")

    result  = []
    skipped = 0
    geocoded = 0

    for idx, row in df.iterrows():
        # ── Champs texte ────────────────────────────────────────────────────
        nom = clean_str(row.get("Nom", ""))
        if not nom:
            skipped += 1
            continue

        entry = {"nom": nom}

        for excel_col, json_key in INFO_FIELDS.items():
            if excel_col in ("Nom", "Latitude", "Longitude"):
                continue   # traités séparément
            val = clean_str(row.get(excel_col, ""))
            if val:
                entry[json_key] = val

        # ── Types acteur (liste) ────────────────────────────────────────────
        acteurs = [col for col in ACTEUR_COLS if is_checked(row.get(col))]
        entry["type_acteur"] = acteurs

        # ── Types résine (liste) ────────────────────────────────────────────
        resines = [col for col in RESINE_COLS if is_checked(row.get(col))]
        entry["type_resine"] = resines

        # ── Coordonnées ─────────────────────────────────────────────────────
        lat_raw = clean_str(row.get("Latitude", ""))
        lng_raw = clean_str(row.get("Longitude", ""))

        try:
            entry["lat"] = round(float(lat_raw), 6)
            entry["lng"] = round(float(lng_raw), 6)
        except (ValueError, TypeError):
            if do_geocode:
                print(f"   [{idx+1}] Géocodage « {nom} »…", end=" ")
                lat, lng = geocode_ban(
                    entry.get("adresse", ""),
                    entry.get("commune", ""),
                    entry.get("code_postal", "")
                )
                if lat is not None:
                    entry["lat"], entry["lng"] = lat, lng
                    geocoded += 1
                    print(f"→ {lat}, {lng}")
                else:
                    print("→ échec (sera ignoré sur la carte)")
            else:
                print(f"   [{idx+1}] Pas de coordonnées pour « {nom} »")

        result.append(entry)

    # ── Écriture JSON ────────────────────────────────────────────────────────
    out = Path(output_path)
    out.parent.mkdir(parents=True, exist_ok=True)
    with open(out, "w", encoding="utf-8") as f:
        json.dump(result, f, ensure_ascii=False, indent=2)

    with_coords = sum(1 for e in result if "lat" in e)
    print(f"\n✅ Export terminé :")
    print(f"   • {len(result)} acteurs  ({with_coords} géolocalisés, dont {geocoded} via BAN)")
    if skipped:
        print(f"   • {skipped} lignes ignorées (Nom vide)")
    print(f"   • Fichier : {out.resolve()}\n")


# ── Point d'entrée ────────────────────────────────────────────────────────────
if __name__ == "__main__":
    args  = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]

    if not args:
        print(__doc__)
        print("Erreur : chemin vers le fichier Excel requis.")
        sys.exit(1)

    excel_in   = args[0]
    json_out   = args[1] if len(args) > 1 else "data/acteurs.json"
    do_geocode = "--no-geocode" not in flags

    excel_to_json(excel_in, json_out, do_geocode)
