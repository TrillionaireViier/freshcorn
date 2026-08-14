import re

with open('old_curated_data.js', 'r') as f:
    old_content = f.read()

with open('src/data.js', 'r') as f:
    current_content = f.read()

def extract_array(name, content):
    pattern = r"export const " + name + r" = \[\n(.*?)\n\];"
    match = re.search(pattern, content, flags=re.DOTALL)
    return match.group(1) if match else ""

old_movies = extract_array("movies", old_content)
old_tv = extract_array("tvShows", old_content)
old_cartoons = extract_array("cartoons", old_content)

def inject_old(name, old_items, content):
    if not old_items: return content
    target = f"export const {name} = [\n"
    replacement = f"export const {name} = [\n{old_items},\n"
    return content.replace(target, replacement, 1)

new_content = current_content
new_content = inject_old("movies", old_movies, new_content)
new_content = inject_old("tvShows", old_tv, new_content)
new_content = inject_old("cartoons", old_cartoons, new_content)

with open('src/data.js', 'w') as f:
    f.write(new_content)

print("Restored original REAL curated items!")
