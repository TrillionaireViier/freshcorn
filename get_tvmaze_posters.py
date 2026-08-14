import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE
import json

shows = [
    "Breaking Bad",
    "Game of Thrones",
    "Stranger Things",
    "Succession",
    "The Last of Us",
    "Chernobyl",
    "The Wire",
    "The Sopranos"
]

results = {}

for show in shows:
    query = urllib.parse.quote(show)
    url = f"https://api.tvmaze.com/singlesearch/shows?q={query}"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, context=ctx).read()
        data = json.loads(response)
        results[show] = data['image']['original']
    except Exception as e:
        results[show] = f"ERROR: {e}"

for name, img in results.items():
    print(f"{name}: {img}")
