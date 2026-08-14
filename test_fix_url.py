import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    "http://ia.media-imdb.com/images/M/MV5BMTg3Njc2ODEyN15BMl5BanBnXkFtZTcwNTAwMzc3NA@@._V1_SX300.jpg",
    "https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg"
]

for u in urls:
    fixed = u.replace("http://ia.media-imdb.com/", "https://m.media-amazon.com/").replace("https://images-na.ssl-images-amazon.com/", "https://m.media-amazon.com/")
    try:
        req = urllib.request.Request(fixed, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req, context=ctx)
        print(f"Success for {fixed}: {res.status}")
    except Exception as e:
        print(f"Failed for {fixed}: {e}")
