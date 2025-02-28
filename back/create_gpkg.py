import json
from pathlib import Path

import geopandas as gpd
import pandas as pd
from shapely.geometry import Point


i = 0


def load_payload(v):
    global i
    # payload = json.loads(v)
    if not v or not isinstance(v, str):
        return None
    try:
        return json.loads(
            v.replace('"', "")
            .replace("'", '"')
            .replace("True", "true")
            .replace("False", "false")
        )
    except json.JSONDecodeError:
        i += 1
        print(i)
        return None


def get_addres(v):
    payload = load_payload(v)
    if not payload:
        return None
    return payload["formatted_address"]


def get_point(v):
    payload = load_payload(v)
    if not payload:
        return None
    y = payload["geometry"]["location"]["lat"]
    x = payload["geometry"]["location"]["lng"]
    return Point(x, y)


def main(xlsx_path, output_path):
    df = pd.read_excel(xlsx_path)
    df = df.drop(columns=["address", "processed_address", "processed_address2"])
    df["address"] = df["google_raw"].apply(get_addres)
    points = df["google_raw"].apply(get_point)

    gdf = gpd.GeoDataFrame(df, geometry=points, crs="EPSG:4326")

    Path(output_path).unlink(missing_ok=True)
    gdf.to_file(output_path, driver="GPKG")

    return gdf


if __name__ == "__main__":
    main("./google_raw.xlsx", "/tmp/google_raw.gpkg")


# https://api.mapbox.com/isochrone/v1/mapbox/walking/-2.493843699933649%2C36.951229357740175?contours_minutes=15%2C30%2C45%2C60&polygons=true&denoise=1&generalize=20&access_token=pk.eyJ1IjoiZnB1Z2EiLCJhIjoiRTNkN1h1OCJ9.jfJA6rSdkFVm_AKa3w4vRA
