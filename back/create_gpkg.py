import json
from pathlib import Path

import geopandas as gpd
import pandas as pd
from shapely.geometry import Point


def load_payload(v):
    if not v or not isinstance(v, str):
        return None
    return json.loads(v)


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


def count_na(df):
    na_google_raw = df["google_raw"].isna().sum()
    na_google_places_raw = df["google_places_raw"].isna().sum()
    na_both = df[["google_raw", "google_places_raw"]].isna().all(axis=1).sum()
    na_address = df["address"].isna().sum()
    return {
        "na_google_raw": na_google_raw,
        "na_google_places_raw": na_google_places_raw,
        "na_both": na_both,
        "na_address": na_address,
    }


def get_google_types(v):
    payload = load_payload(v)
    if not payload:
        return None

    if "political" in payload["types"]:
        first_type = "political"
    elif "premise" in payload["types"] or "subpromise" in payload["types"]:
        first_type = "premise or subpromise"
    elif "establishment" in payload["types"]:
        first_type = "establishment"
    else:
        first_type = payload["types"][0]

    # return f'{payload["types"]} - {payload["geometry"]["location_type"]}'
    return f'{first_type} - {payload["geometry"]["location_type"]}'


def print_google_types(df):
    result = df["google_raw"].apply(get_google_types).value_counts()
    print(result)


def get_google_lat(v):
    payload = load_payload(v)
    if not payload:
        return None
    return payload["geometry"]["location"]["lat"]


def get_google_lng(v):
    payload = load_payload(v)
    if not payload:
        return None
    return payload["geometry"]["location"]["lng"]


def main(xlsx_path, output_path):
    df = pd.read_excel(xlsx_path)
    print(count_na(df))

    # df["google_lat"] = df["google_raw"].apply(get_google_lat)
    # df["google_lng"] = df["google_raw"].apply(get_google_lng)

    print_google_types(df)

    df["address"] = df["google_raw"].apply(get_addres)
    points = df["google_raw"].apply(get_point)
    df = df.drop(
        columns=[
            "processed_address",
            "processed_address2",
            "google_raw",
            "google_places_raw",
        ]
    )

    gdf = gpd.GeoDataFrame(df, geometry=points, crs="EPSG:4326")

    Path(output_path).unlink(missing_ok=True)
    gdf.to_file(output_path, driver="GPKG")

    return gdf


if __name__ == "__main__":
    main("../.cache/fixtures/google_raw_places.xlsx", "/tmp/test_pois.gpkg")


# https://api.mapbox.com/isochrone/v1/mapbox/walking/-2.493843699933649%2C36.951229357740175?contours_minutes=15%2C30%2C45%2C60&polygons=true&denoise=1&generalize=20&access_token=pk.eyJ1IjoiZnB1Z2EiLCJhIjoiRTNkN1h1OCJ9.jfJA6rSdkFVm_AKa3w4vRA
