import json
import sys
from pathlib import Path

import fiona
from shapely.geometry import shape


def get_bbox(geopackage_path, layername, output_path):
    with fiona.open(geopackage_path, layer=layername) as layer:
        features = []
        for feature in layer:
            geom = shape(feature["geometry"])
            centroid = list(geom.centroid.coords[0])

            bbox = geom.bounds
            attributes = {
                "code": feature["properties"].get("code"),
                "nameunit": feature["properties"].get("nameunit"),
            }
            feature_dict = {"centroid": centroid, "bbox": bbox, **attributes}
            features.append(feature_dict)

        with Path(output_path).open("w", encoding="utf-8") as f:
            json.dump(features, f, indent=4, ensure_ascii=False)


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print("Usage: python get_bbox.py <geopackage_path> <layername> <output_path>")
        sys.exit(1)

    geopackage_path = sys.argv[1]
    layername = sys.argv[2]
    output_path = sys.argv[3]

    get_bbox(geopackage_path, layername, output_path)
