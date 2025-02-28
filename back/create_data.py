import sys
from pathlib import Path

# import geopandas as gpd
import mygeocode
import pandas as pd
import prepare_columns


def build_data(
    geopackage_path, layername, xlsx_path, xlsx_sheet, matchtable_path, output_path
):
    df = pd.read_excel(xlsx_path, sheet_name=xlsx_sheet)
    df = prepare_columns.prepare_columns(df, matchtable_path)
    df = prepare_columns.create_category_column(df)
    df = prepare_columns.create_extra_column(df)
    gdf = mygeocode.geocode_df(df, geopackage_path, layername)
    gdf.to_excel("/tmp/google_raw.xlsx")

    # Path(output_path).unlink(missing_ok=True)
    # gdf.to_file(output_path, driver="GPKG")
    return gdf


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
    matchtable_path = sys.argv[3]
    output_path = Path("/tmp/pois.gpkg")

    build_data(
        geopackage_path, layername, xlsx_path, xlsx_sheet, matchtable_path, output_path
    )
