import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

try:
    req = urllib.request.Request("https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json")
    res = urllib.request.urlopen(req, context=ctx).read()
    data = json.loads(res)
    print(f"GitHub Movies Success: {len(data['movies'])} movies found")
except Exception as e:
    print(f"GitHub Error: {e}")
