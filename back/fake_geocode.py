import random

import geopandas as gpd
import pandas as pd
from shapely.geometry import Point


def get_random_point_in_polygon(polygon):
    minx, miny, maxx, maxy = polygon.bounds
    while True:
        p = Point(random.uniform(minx, maxx), random.uniform(miny, maxy))
        if polygon.contains(p):
            return p


def get_municipality_geoms(geopackage_path, layername):
    gdf = gpd.read_file(geopackage_path, layer=layername)
    return {row["code"]: row["geometry"] for _, row in gdf.iterrows()}


# def get_municipality_polygon(matchtable, municipality_geoms, name):
#     code = matchtable["name"]["code"]
#     return municipality_geoms[code]


def get_poi_point(municipality_geoms, code):
    polygon = municipality_geoms[code]
    return get_random_point_in_polygon(polygon)


def fake_geocode(df: pd.DataFrame, geopackage_path, layername) -> gpd.GeoDataFrame:
    municipality_geoms = get_municipality_geoms(geopackage_path, layername)
    points = df.apply(
        lambda row: get_poi_point(municipality_geoms, row["code"]), axis=1
    )
    gdf = gpd.GeoDataFrame(df, geometry=points, crs="EPSG:4326")
    return gdf
