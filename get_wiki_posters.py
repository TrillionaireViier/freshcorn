import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

movies = ["Inception", "The Dark Knight (film)", "Interstellar (film)", "Pulp Fiction", "The Matrix", "Goodfellas", "The Shawshank Redemption", "Parasite (2019 film)"]

for title in movies:
    url = f"https://en.wikipedia.org/w/api.php?action=query&titles={urllib.parse.quote(title)}&prop=pageimages&format=json&pithumbsize=1000"
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, context=ctx).read()
        data = json.loads(res)
        pages = data['query']['pages']
        page = list(pages.values())[0]
        if 'thumbnail' in page:
            print(f"{title}: {page['thumbnail']['source']}")
        else:
            print(f"{title}: NO IMAGE")
    except Exception as e:
        print(f"{title}: ERROR {e}")
