import json
import sys
from difflib import get_close_matches
from pathlib import Path

import fiona
import pandas as pd


def get_gpkg_names(geopackage_path, layername):
    with fiona.open(geopackage_path, layer=layername) as layer:
        return [
            {
                "code": feature["properties"].get("code"),
                "nameunit": feature["properties"].get("nameunit"),
            }
            for feature in layer
        ]


def get_xlsx_names(xlsx_path, xlsx_sheet):
    df = pd.read_excel(xlsx_path, sheet_name=xlsx_sheet)
    return df["MUNICIPIO"].unique().tolist()


def match_incorrect_names(incorrect_names, correct_names):
    matched_names = {}
    for name in incorrect_names:
        close_matches = get_close_matches(name, correct_names, n=1, cutoff=0.6)
        if close_matches:
            matched_names[name] = close_matches[0]
        else:
            matched_names[name] = None
    return matched_names


def get_attributes(gpkg_names, name):
    for gpkg_name in gpkg_names:
        if gpkg_name["nameunit"] == name:
            return {"name": gpkg_name["nameunit"], "code": gpkg_name["code"]}
    return None


def match_names(geopackage_path, layername, xlsx_path, xlsx_sheet, output_path):
    gpkg_names = get_gpkg_names(geopackage_path, layername)
    xlsx_names = get_xlsx_names(xlsx_path, xlsx_sheet)
    match_table = match_incorrect_names(
        xlsx_names, [name["nameunit"] for name in gpkg_names]
    )
    enritched_match_table = {
        xlsx_name: get_attributes(gpkg_names, gpkg_name)
        for xlsx_name, gpkg_name in match_table.items()
    }

    with Path(output_path).open("w", encoding="utf-8") as f:
        json.dump(enritched_match_table, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(
            "Usage: python match_municipality_names.py <geopackage_path> <xlsx_path> <output_path>"
        )
        sys.exit(1)

    geopackage_path = sys.argv[1]
    layername = "municipios"
    xlsx_path = sys.argv[2]
    xlsx_sheet = "POIs"
    output_path = sys.argv[3]

    match_names(geopackage_path, layername, xlsx_path, xlsx_sheet, output_path)
