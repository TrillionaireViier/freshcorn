import re
import codecs
import random

with codecs.open('src/data.js', 'r', 'utf-8') as f:
    content = f.read()

# Extract all IDs
all_ids = re.findall(r"id:\s*['\"]([^'\"]+)['\"],\s*(?:title|headline):", content)
# Exclude news IDs
valid_media_ids = [i for i in all_ids if i not in ['christopher-nolan-s-next-project-shrouded-in-mystery', 'netflix-cancels-fan-favorite-sci-fi-series-after-two-seasons']]

def replace_review_mediaId(match):
    return f"\"mediaId\": \"{random.choice(valid_media_ids)}\""

# Replace mediaId in reviews
content = re.sub(r"\"mediaId\":\s*\"[^\"]+\"", replace_review_mediaId, content)

with codecs.open('src/data.js', 'w', 'utf-8') as f:
    f.write(content)

print("Fixed review mediaIds!")
