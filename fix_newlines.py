import codecs

with codecs.open('src/data.js', 'r', 'utf-8') as f:
    content = f.read()

# Replace literal \n with actual newlines
content = content.replace('\\n', '\n')

with codecs.open('src/data.js', 'w', 'utf-8') as f:
    f.write(content)

print("Fixed literal newlines!")
