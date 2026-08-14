import re

with open('src/data.js', 'r') as f:
    content = f.read()

# Add trailer for m1
pattern_m1 = r"(id:\s*['\"]m1['\"].*?isTrending.*?)(isInTheaters)"
content = re.sub(pattern_m1, r"trailerId: 'YoHD9XEInc0', \1\2", content, flags=re.DOTALL)

# Add trailer for t2
pattern_t2 = r"(id:\s*['\"]t2['\"].*?isTrending.*?)(isInTheaters)"
content = re.sub(pattern_t2, r"trailerId: 'b9EkMc79ZSU', \1\2", content, flags=re.DOTALL)

with open('src/data.js', 'w') as f:
    f.write(content)

print("Added trailers to m1 and t2")
