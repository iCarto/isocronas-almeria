import json
import time
import urllib.error
import urllib.parse
import urllib.request

from mysecrets import GM_API_KEY


def get(*, base_url=None, query_params=None, post_params=None, response_parser):
    # response parser is a function that knows how to return the results after being load as json

    # Join the parts of the URL together into one string.
    if query_params:
        params_encoded = urllib.parse.urlencode(query_params)
        url = f"{base_url}?{params_encoded}"
    else:
        url = base_url

    current_delay = 0.1  # Set the initial retry delay to 100ms.
    max_delay = 5  # Set the maximum retry delay to 5 seconds.

    while True:
        try:
            # Get the API response.
            if post_params:
                data = json.dumps(post_params, ensure_ascii=False).encode("utf-8")
                # print(data)
                # print(url)
                request = urllib.request.Request(url, data=data, method="POST")
                request.add_header("Content-Type", "application/json")
                response = urllib.request.urlopen(request)
            else:
                response = urllib.request.urlopen(url)
        except urllib.error.URLError as e:
            # Fall through to the retry loop.
            # pass
            print(e)
        else:
            return response_parser(response)

        if current_delay > max_delay:
            raise Exception("Too many retry attempts.")

        print("Waiting", current_delay, "seconds before retrying.")

        time.sleep(current_delay)
        current_delay *= 2  # Increase the delay each time we retry.


def build_params_example():
    def response_parser(response):
        # If we didn't get an IOError then parse the result.
        result = json.load(response)
        print(result)

        if result["status"] == "OK":
            return result["timeZoneId"]

        # Many API errors cannot be fixed by a retry, e.g. INVALID_REQUEST or
        # ZERO_RESULTS. There is no point retrying these requests.
        raise Exception(result["errorMessage"])

    lat = 39.6034810
    lng = -119.6822510
    timestamp = 1331161200

    return {
        "query_params": {
            "location": f"{lat},{lng}",
            "timestamp": timestamp,
            "key": GM_API_KEY,
        },
        "response_parser": response_parser,
        "base_url": "https://maps.googleapis.com/maps/api/timezone/json",
    }


if __name__ == "__main__":
    # The maps_key defined below isn't a valid Google Maps API key.
    # You need to get your own API key.
    # See https://developers.google.com/maps/documentation/timezone/get-api-key
    params = build_params_example()
    tz = get(**params)
    print(f"Timezone: {tz}")
