import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

# Test YTS API (Movies)
try:
    req = urllib.request.Request("https://yts.mx/api/v2/list_movies.json?limit=1", headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req, context=ctx).read()
    data = json.loads(res)
    print(f"YTS API Success: {data['data']['movies'][0]['title']}")
except Exception as e:
    print(f"YTS API Error: {e}")

# Test TVMaze API (TV Shows)
try:
    req = urllib.request.Request("https://api.tvmaze.com/shows?page=0", headers={'User-Agent': 'Mozilla/5.0'})
    res = urllib.request.urlopen(req, context=ctx).read()
    data = json.loads(res)
    print(f"TVMaze API Success: {data[0]['name']}")
except Exception as e:
    print(f"TVMaze API Error: {e}")
