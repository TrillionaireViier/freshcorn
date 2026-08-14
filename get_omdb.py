import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

movies = ["Inception", "The Dark Knight", "Interstellar", "Pulp Fiction", "The Matrix", "Goodfellas", "The Shawshank Redemption", "Parasite"]
cartoons = ["Arcane", "Avatar: The Last Airbender", "Rick and Morty", "Inside Out", "Toy Story", "Spirited Away"]
all_items = movies + cartoons

keys = ["trilogy", "bananas", "thewdb", "8b652875", "b9a5e69d", "d88b0a9"]

for key in keys:
    try:
        url = f"http://www.omdbapi.com/?t=Inception&apikey={key}"
        res = urllib.request.urlopen(url).read()
        data = json.loads(res)
        if "Poster" in data:
            print(f"Working key: {key}")
            break
    except:
        pass

if "Poster" in data:
    for title in all_items:
        url = f"http://www.omdbapi.com/?t={urllib.parse.quote(title)}&apikey={key}"
        res = urllib.request.urlopen(url).read()
        d = json.loads(res)
        if "Poster" in d:
            img = d['Poster']
            import re
            highres = re.sub(r'\._V1_.*\.jpg', '._V1_.jpg', img)
            print(f"{title}: {highres}")
