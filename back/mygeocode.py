import json

import pandas as pd
from mysecrets import GM_API_KEY
from prepare_geocode import prepare_geocode


def get_raw_data_as_json_str(geocode, query):
    result = geocode(query=query)
    if not result:
        return None
    return json.dumps(result.raw, ensure_ascii=False)


def google_raw(df: pd.DataFrame) -> pd.DataFrame:
    geocode = google_raw_geocoder_function()

    def do_geocoding(row):
        if not row["processed_address2"]:
            return None
        query = f'{row["processed_address2"]}. {row["municipality"]}'
        raw_location_response = get_raw_data_as_json_str(geocode, query)
        row["google_raw"] = raw_location_response
        # print(raw_location_response)
        return row

    return df.apply(do_geocoding, axis=1)


def geocode_df(df: pd.DataFrame) -> pd.DataFrame:
    df = prepare_geocode(df)
    df["google_raw"] = None
    df = google_raw(df)

    return df


def google_raw_geocoder_function():
    config = {"api_key": GM_API_KEY}
    from geopy.geocoders import GoogleV3

    geolocator = GoogleV3(**config)
    from functools import partial

    return partial(
        geolocator.geocode,
        region="ES",
        language="es",
        components={
            "country": "ES",
            "administrative_area_level_1": "Andalucía",
            "administrative_area_level_2": "Almería",
        },
    )


def get_geocode_function_from_service(service, config, delay=None):
    # import geopy.geocoders
    # geopy.geocoders.options.default_user_agent = 'my_app/1'
    # geopy.geocoders.options.default_timeout = 7
    # geolocator = Nominatim()
    # print(geolocator.headers)
    # print(geolocator.timeout)

    from geopy.geocoders import get_geocoder_for_service

    cls = get_geocoder_for_service(service)
    geolocator = cls(**config)
    if delay:
        from geopy.extra.rate_limiter import RateLimiter

        return RateLimiter(geolocator.geocode, min_delay_seconds=delay)

    return geolocator.geocode


def geocode_wrapper(geolocator, suffix="Almería."):
    # geocode_wrapper("C/ del rocio 1")
    # geocode_wrapper("C/ del rocio 1", language="en"))
    from functools import partial

    _geocode = partial(geolocator.geocode, language="es")
    return lambda query, **kw: _geocode(f"{query}. {suffix}", **kw)


def geocode(geocoder, query):
    location = geocoder.geocode(query=query)
    # print(location.address)
    # print(location.latitude, location.longitude)
    # print(location.raw)
    return location.raw


# TODO: Gestionar códigos postales.
