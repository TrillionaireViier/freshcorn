import urllib.request
import re
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

shows = {
    "Breaking Bad": "https://www.imdb.com/title/tt0903747/",
    "Game of Thrones": "https://www.imdb.com/title/tt0944947/",
    "Stranger Things": "https://www.imdb.com/title/tt4574334/",
    "Succession": "https://www.imdb.com/title/tt7660850/",
    "The Last of Us": "https://www.imdb.com/title/tt3581920/",
    "Chernobyl": "https://www.imdb.com/title/tt9419884/",
    "The Wire": "https://www.imdb.com/title/tt0319969/",
    "The Sopranos": "https://www.imdb.com/title/tt0141842/"
}

headers = {'User-Agent': 'Mozilla/5.0'}

results = {}

for name, url in shows.items():
    try:
        req = urllib.request.Request(url, headers=headers)
        html = urllib.request.urlopen(req, context=ctx).read().decode('utf-8')
        match = re.search(r'<meta property="og:image" content="(.*?)"', html)
        if match:
            results[name] = match.group(1)
        else:
            results[name] = "NOT_FOUND"
    except Exception as e:
        results[name] = str(e)

for name, img in results.items():
    print(f"{name}: {img}")
