import re
import random

with open('src/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

def slugify(value):
    value = re.sub(r'[^\w\s-]', '', value).strip().lower()
    value = re.sub(r'[-\s]+', '-', value)
    return value

used_slugs = set()
valid_media_ids = []

def replace_id(match):
    original_id = match.group(1)
    title = match.group(2)
    slug = slugify(title)
    
    if not slug:
        slug = original_id
    
    if slug in used_slugs:
        counter = 1
        new_slug = f"{slug}-{counter}"
        while new_slug in used_slugs:
            counter += 1
            new_slug = f"{slug}-{counter}"
        slug = new_slug

    used_slugs.add(slug)
    valid_media_ids.append(slug)
    
    return f"id: '{slug}', title: \"{title}\""

def replace_news_id(match):
    original_id = match.group(1)
    headline = match.group(2)
    slug = slugify(headline)
    
    if not slug:
        slug = original_id
        
    if slug in used_slugs:
        counter = 1
        new_slug = f"{slug}-{counter}"
        while new_slug in used_slugs:
            counter += 1
            new_slug = f"{slug}-{counter}"
        slug = new_slug

    used_slugs.add(slug)
    
    return f"id: '{slug}', headline: \"{headline}\""

# Format: id: 'm_0', title: "Beetlejuice"
content = re.sub(r"id:\s*['\"]([^'\"]+)['\"],\s*title:\s*\"(.*?)\"(?=\s*,)", replace_id, content)

# Format: id: 'n1', headline: "..."
content = re.sub(r"id:\s*['\"]([^'\"]+)['\"],\s*headline:\s*\"(.*?)\"(?=\s*,)", replace_news_id, content)

def replace_review_mediaId(match):
    if not valid_media_ids:
        return match.group(0)
    return f"\"mediaId\": \"{random.choice(valid_media_ids)}\""

# Replace mediaId in reviews
content = re.sub(r"\"mediaId\":\s*\"[^\"]+\"", replace_review_mediaId, content)

# ensure we fix the literal \n issue if any
content = content.replace('\\n', '\n')

with open('src/data.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Updated data.js with readable IDs!")
