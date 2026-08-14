import json
import random

with open('src/data.js', 'r') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if "export const newsArticles = [" in line:
        break
    new_lines.append(line)

news = [
    {
        "id": "n1",
        "title": "Nolan Announces Next Mind-Bending Thriller",
        "date": "August 12, 2026",
        "excerpt": "Christopher Nolan's next project is shrouded in mystery, but sources say it involves time dilation.",
        "image": "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80",
        "content": "Christopher Nolan, the visionary director behind Inception and Interstellar, has officially announced his next feature film. The project, currently untitled, is reportedly a sci-fi thriller dealing with themes of time dilation and parallel universes. Production is set to begin in late 2026, with IMAX cameras already being tested. Fans are eagerly anticipating what new visual spectacles Nolan will bring to the screen. Cillian Murphy and Robert Pattinson are rumored to be in talks for lead roles."
    },
    {
        "id": "n2",
        "title": "Marvel's Phase 7 Lineup Revealed",
        "date": "August 10, 2026",
        "excerpt": "Kevin Feige took the stage at D23 to announce the next slate of MCU films, including X-Men.",
        "image": "https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800&q=80",
        "content": "At this year's D23 Expo, Marvel Studios president Kevin Feige unveiled the highly anticipated Phase 7 slate. The biggest reveal was the official integration of the X-Men into the core MCU storyline, with a standalone film directed by Ryan Coogler. Additionally, a new Avengers film titled 'Avengers: Secret Wars Part 2' was confirmed. The crowd went wild when Hugh Jackman made a surprise appearance, confirming his return as Wolverine for one final team-up."
    },
    {
        "id": "n3",
        "title": "Indie Film 'Echoes' Sweeps the Oscars",
        "date": "August 8, 2026",
        "excerpt": "A micro-budget indie darling shocked Hollywood by taking home Best Picture.",
        "image": "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&q=80",
        "content": "In a stunning upset, the micro-budget indie drama 'Echoes' won Best Picture at the 98th Academy Awards. Directed by a first-time filmmaker, the movie explores the complexities of memory and grief. It beat out heavily favored blockbusters and established auteurs. The win marks a significant shift in Academy voting patterns, showing a preference for raw, emotionally resonant storytelling over CGI spectacles. The director's acceptance speech was the highlight of the night."
    },
    {
        "id": "n4",
        "title": "Netflix Cancels Beloved Sci-Fi Series",
        "date": "August 5, 2026",
        "excerpt": "Fans are furious after the streaming giant canceled a critically acclaimed show after just one season.",
        "image": "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?w=800&q=80",
        "content": "Netflix has once again drawn the ire of its subscribers by cancelling 'Neon Skies', a highly rated sci-fi series, after only a single season. Despite boasting a 95% Critics Score on FreshPopcorn and a dedicated fanbase, the streaming service cited 'low completion rates' as the reason for cancellation. Campaigns to save the show immediately began trending on social media, with fans raising money for billboards outside Netflix HQ. The creators have expressed hope that another network might pick it up."
    },
    {
        "id": "n5",
        "title": "The Rise of AI in Screenwriting",
        "date": "August 2, 2026",
        "excerpt": "Hollywood is divided over the increasing use of artificial intelligence in script development.",
        "image": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
        "content": "Artificial intelligence tools are becoming commonplace in writers' rooms across Hollywood, sparking intense debate. Proponents argue that AI can help break writer's block and generate unique plot twists, while critics fear it will lead to homogenized, soulless content. The Writers Guild recently released new guidelines regulating the use of AI, stating that AI cannot be credited as a writer and that human writers must retain ultimate creative control. The controversy shows no signs of slowing down."
    },
    {
        "id": "n6",
        "title": "Dune: Messiah Breaks Box Office Records",
        "date": "July 28, 2026",
        "excerpt": "Denis Villeneuve's epic conclusion to the Dune saga earned $300M in its opening weekend.",
        "image": "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80",
        "content": "Denis Villeneuve's 'Dune: Messiah' has completely decimated box office expectations, pulling in over $300 million globally in its opening weekend. The visually stunning epic concludes Paul Atreides' journey and features groundbreaking special effects. Critics are calling it a masterpiece of modern cinema, comparing its cultural impact to The Lord of the Rings. The film's massive success guarantees that the sci-fi genre will dominate Hollywood for years to come."
    },
    {
        "id": "n7",
        "title": "Streaming Wars Intensify: Apple Buys Paramount",
        "date": "July 20, 2026",
        "excerpt": "In a shocking acquisition, Apple has purchased Paramount Pictures to bolster its streaming catalog.",
        "image": "https://images.unsplash.com/photo-1616469829581-73993eb86b02?w=800&q=80",
        "content": "The streaming landscape has shifted dramatically with Apple's acquisition of Paramount Pictures for a reported $15 billion. The deal gives Apple TV+ exclusive access to massive franchises like Mission: Impossible, Star Trek, and Transformers. Industry analysts predict this move will force smaller streaming services to merge or fold. Consumers, meanwhile, are expressing frustration over the increasing fragmentation of content across different, expensive subscriptions."
    },
    {
        "id": "n8",
        "title": "Horror Renaissance Continues with 'The Void'",
        "date": "July 15, 2026",
        "excerpt": "A new psychological horror film is making audiences faint in theaters.",
        "image": "https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=800&q=80",
        "content": "'The Void', a deeply unsettling psychological horror film, is the unexpected hit of the summer. Reports of audiences fainting and walking out due to sheer terror have only fueled the film's viral marketing campaign. Directed by a master of suspense, the film relies on atmosphere and sound design rather than cheap jump scares. It currently holds a rare 98% Fresh rating on FreshPopcorn, proving that the modern horror renaissance is alive and well."
    },
    {
        "id": "n9",
        "title": "Tarantino's Tenth and Final Film Announced",
        "date": "July 10, 2026",
        "excerpt": "Quentin Tarantino has revealed details about his final movie, 'The Movie Critic'.",
        "image": "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80",
        "content": "True to his promise of retiring after ten films, Quentin Tarantino has officially announced his final project: 'The Movie Critic'. Set in 1970s Los Angeles, the film follows a cynical film reviewer writing for a pornographic magazine. Tarantino described it as a 'love letter to cinema's dirty, gritty underbelly'. Brad Pitt and Leonardo DiCaprio are confirmed to star. Fans are already mourning the end of an era for one of cinema's most distinctive voices."
    },
    {
        "id": "n10",
        "title": "Video Game Adaptations Are the New Superheroes",
        "date": "July 5, 2026",
        "excerpt": "Following the success of The Last of Us and Fallout, studios are rushing to adapt games.",
        "image": "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&q=80",
        "content": "The 'video game curse' is officially broken. Thanks to the massive critical and commercial success of adaptations like 'The Last of Us' and 'Fallout', Hollywood has found its replacement for the fading superhero genre. Studios are currently developing adaptations of 'God of War', 'Zelda', and 'Red Dead Redemption'. Showrunners emphasize that taking the source material seriously and respecting the fans is the key to finally getting these adaptations right."
    }
]

# Generate 30 reviews
review_texts = [
    ("A cinematic masterpiece that redefines the genre.", 98),
    ("Visually stunning but narratively hollow.", 55),
    ("An absolute triumph of filmmaking. Essential viewing.", 100),
    ("I fell asleep halfway through. Pacing is terrible.", 30),
    ("The performances carry a somewhat predictable script.", 75),
    ("Blew my mind! The cinematography is unmatched.", 95),
    ("A letdown compared to the director's previous work.", 45),
    ("Heartbreaking and beautiful. I cried three times.", 92),
    ("Overhyped and overly long. Could have been 30 mins shorter.", 40),
    ("A perfect blend of action and emotional depth.", 88),
    ("Confusing plot that thinks it's smarter than it is.", 35),
    ("The score alone is worth the price of admission.", 85),
    ("Nostalgia bait with no real substance.", 48),
    ("Groundbreaking special effects and a tight script.", 90),
    ("Just boring. I don't get the hype at all.", 20),
    ("A modern classic that will be studied in film schools.", 99),
    ("The dialogue felt clunky and unnatural.", 50),
    ("Incredible world-building. I want to live in this universe.", 94),
    ("A messy third act ruins an otherwise great premise.", 60),
    ("Fun, fast-paced, and exactly what it promises to be.", 80),
    ("Pretentious garbage.", 15),
    ("A slow burn that rewards patient viewers.", 86),
    ("The chemistry between the leads is non-existent.", 42),
    ("Action sequences are breathtakingly choreographed.", 91),
    ("Relies too heavily on CGI. Lacks heart.", 46),
    ("A brilliant satire of modern society.", 96),
    ("The ending was completely unearned and frustrating.", 38),
    ("Pure popcorn entertainment. Turn your brain off and enjoy.", 78),
    ("A hauntingly beautiful exploration of the human condition.", 97),
    ("Terrible editing choices make it hard to follow.", 25)
]

authors = ["Roger Ebert II", "CinematicFan99", "Sarah Reviews", "MovieBuff_Tom", "The Daily Critic", "FilmNerd2026", "Popcorn Enthusiast", "NYT Arts", "Casual Viewer", "Director's Chair", "IndieWire Insider", "Blockbuster Fan", "ClassicCinephile", "Reel Thoughts", "ScreenRant Reader"]

# Attach to m_0, m_1, m_2, t_0, t_1, c_0
target_ids = ['m_0', 'm_1', 'm_2', 't_0', 't_1', 't_2', 'c_0', 'c_1']

reviews = []
for i in range(30):
    text, score = review_texts[i]
    reviews.append({
        "id": i+1,
        "mediaId": random.choice(target_ids),
        "author": random.choice(authors),
        "text": text,
        "score": score
    })

news_js = "export const newsArticles = " + json.dumps(news, indent=2) + ";\n\n"
reviews_js = "export const reviews = " + json.dumps(reviews, indent=2) + ";\n"

with open('src/data.js', 'w') as f:
    f.writelines(new_lines)
    f.write(news_js)
    f.write(reviews_js)

print("Added news and reviews to data.js")
