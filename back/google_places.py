import json

import pandas as pd
import request_with_backoff
from mysecrets import GM_API_KEY


def get_raw_data_as_json_str(query):
    result = request_with_backoff.get(**build_params(query))
    if not result:
        return None
    return json.dumps(result, ensure_ascii=False)


def build_params(query):
    def response_parser(response):
        result: dict = json.load(response)
        # print(result)
        print("*")
        if not result or not result.get("places"):
            print(f"Not result for: {query}")
            return None
        return result["places"][0]

    return {
        "query_params": {"fields": "*", "key": GM_API_KEY},
        "post_params": {
            "textQuery": query,
            "languageCode": "es",
            "regionCode": "ES",
            "pageSize": 1,
            "locationRestriction": {
                "rectangle": {
                    "low": {"latitude": 35.5, "longitude": -3.5},
                    "high": {"latitude": 38, "longitude": -1.5},
                }
            },
        },
        "response_parser": response_parser,
        "base_url": "https://places.googleapis.com/v1/places:searchText",
    }


# import time


def google_places_geocode(df: pd.DataFrame) -> pd.DataFrame:
    def do_geocoding(row):
        # time.sleep(5)
        if not row["processed_address2"]:
            return None
        query = f'{row["name"]}. {row["processed_address2"]}. {row["municipality"]}. Almería'
        raw_location_response = get_raw_data_as_json_str(query)
        row["google_places_raw"] = raw_location_response
        # print(raw_location_response)
        return row

    return df.apply(do_geocoding, axis=1)


def geocode_df(df: pd.DataFrame) -> pd.DataFrame:
    df["google_places_raw"] = None
    df = google_places_geocode(df)

    return df


if __name__ == "__main__":
    df = pd.read_excel("../.cache/fixtures/google_raw.xlsx")
    df = geocode_df(df)
    df.to_excel("../.cache/fixtures/google_raw_places.xlsx")
