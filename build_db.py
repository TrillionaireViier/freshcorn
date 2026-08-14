import urllib.request
import json
import ssl
import random
import re

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def clean_html(raw_html):
    if not raw_html: return ""
    cleanr = re.compile('<.*?>')
    cleantext = re.sub(cleanr, '', raw_html)
    return cleantext.replace('"', '\\"').replace('\n', ' ')

print("Fetching movies...")
req = urllib.request.Request("https://raw.githubusercontent.com/erik-sytnyk/movies-list/master/db.json")
res = urllib.request.urlopen(req, context=ctx).read()
movie_data = json.loads(res)['movies']

print("Fetching TV shows...")
tv_data = []
for page in range(2):
    req2 = urllib.request.Request(f"https://api.tvmaze.com/shows?page={page}", headers={'User-Agent': 'Mozilla/5.0'})
    res2 = urllib.request.urlopen(req2, context=ctx).read()
    tv_data.extend(json.loads(res2))

print("Fetching Cartoons/Anime...")
req3 = urllib.request.Request("https://api.jikan.moe/v4/top/anime?limit=50", headers={'User-Agent': 'Mozilla/5.0'})
try:
    res3 = urllib.request.urlopen(req3, context=ctx).read()
    anime_data = json.loads(res3)['data']
except:
    anime_data = []

movies = []
for i, m in enumerate(movie_data):
    if not m.get('posterUrl'): continue
    movies.append(f"""  {{
    id: 'm_{i}', title: "{m.get('title', '').replace('"', '\\"')}", year: {m.get('year', 2000)}, duration: "{m.get('runtime', 120)}m", rating: "PG-13",
    genre: "{" / ".join(m.get('genres', ['Drama']))}", criticsScore: {random.randint(60, 99)}, audienceScore: {random.randint(60, 99)},
    synopsis: "{m.get('plot', '').replace('"', '\\"')}",
    director: "{m.get('director', 'Unknown').replace('"', '\\"')}", cast: {json.dumps(m.get('actors', '').split(', ')[:3])},
    poster: "{m.get('posterUrl')}",
    backdrop: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1600&q=80",
    isTrending: {str(random.random() > 0.8).lower()}, isInTheaters: {str(random.random() > 0.9).lower()}
  }}""")

tv_shows = []
cartoons = []

for i, t in enumerate(tv_data):
    img = t.get('image')
    if not img: continue
    poster = img.get('original', img.get('medium'))
    
    genres = t.get('genres', [])
    rating = t.get('rating', {}).get('average')
    if rating: 
        critics = int(rating * 10)
        audience = min(100, critics + random.randint(-5, 10))
    else:
        critics = random.randint(60, 95)
        audience = random.randint(60, 95)
        
    year = t.get('premiered', '2010')[:4] if t.get('premiered') else '2010'
    
    obj = f"""  {{
    id: 't_{i}', title: "{t.get('name', '').replace('"', '\\"')}", year: {year}, duration: "{t.get('runtime', 45)}m", rating: "TV-MA",
    genre: "{" / ".join(genres[:2]) if genres else "Drama"}", criticsScore: {critics}, audienceScore: {audience},
    synopsis: "{clean_html(t.get('summary', ''))}",
    director: "Unknown", cast: ["Unknown Actor"],
    poster: "{poster}",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&q=80",
    isTrending: {str(random.random() > 0.8).lower()}, isInTheaters: false
  }}"""

    if 'Anime' in genres or 'Animation' in genres:
        cartoons.append(obj)
    else:
        tv_shows.append(obj)

for i, a in enumerate(anime_data):
    img = a.get('images', {}).get('jpg', {}).get('large_image_url')
    if not img: continue
    
    score = a.get('score', 8.0)
    critics = int(score * 10)
    audience = min(100, critics + random.randint(-2, 5))
    
    obj = f"""  {{
    id: 'c_{i}', title: "{a.get('title', '').replace('"', '\\"')}", year: {a.get('year') or 2010}, duration: "24m", rating: "TV-14",
    genre: "Anime / Animation", criticsScore: {critics}, audienceScore: {audience},
    synopsis: "{clean_html(a.get('synopsis', '')).replace('"', '\\"')}",
    director: "Unknown", cast: ["Anime Voice Actor"],
    poster: "{img}",
    backdrop: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80",
    isTrending: {str(random.random() > 0.5).lower()}, isInTheaters: false
  }}"""
    cartoons.append(obj)

# Read bottom of data.js
with open('src/data.js', 'r') as f:
    lines = f.readlines()

bottom_part = ""
start = False
for line in lines:
    if "export const newsArticles = [" in line:
        start = True
    if start:
        bottom_part += line

# Pad cartoons with some TV shows if we don't have enough
if len(cartoons) < 50:
    needed = 50 - len(cartoons)
    cartoons.extend(tv_shows[:needed])
    tv_shows = tv_shows[needed:]

output = f"""// Generated data.js with {len(movies)} movies, {len(tv_shows)} tv shows, and {len(cartoons)} cartoons.

export const movies = [
{",\\n".join(movies)}
];

export const tvShows = [
{",\\n".join(tv_shows)}
];

export const cartoons = [
{",\\n".join(cartoons)}
];

{bottom_part}"""

with open('src/data.js', 'w') as f:
    f.write(output)

print(f"Successfully generated data.js! Movies: {len(movies)}, TV: {len(tv_shows)}, Cartoons: {len(cartoons)}")
