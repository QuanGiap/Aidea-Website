import praw
import praw.exceptions
import os
from dotenv import load_dotenv
from google import genai
import json
from database import SessionLocal
import models
from sqlalchemy.exc import SQLAlchemyError


# subreddits: personal finance, productivity, healthcare
# https://www.reddit.com/r/SomebodyMakeThis/, 
load_dotenv(dotenv_path='../.env')

def get_reddit_posts():
  reddit = praw.Reddit(
    client_id = os.getenv("REDDIT_CLIENT_ID"),
    client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
    user_agent="test",
  )

  posts = []
  try:
    for post in reddit.subreddit("SomebodyMakeThis").new(limit=15):
      if ("Monthly Thread" in post.title):
        continue
      row = {
        #"reddit_id": post.id,
        "title": post.title,
        "body": post.selftext,
        "url": post.url
      }
      posts.append(row)
    return posts
  except praw.exceptions.RedditAPIException as e:
    print(f"{e}")
  except praw.exceptions.ClientException as e:
        print(f"{e}")

def parse_posts():
  posts = get_reddit_posts()
  client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
  response = client.models.generate_content(
    model="gemini-2.0-flash", 
    contents  = f"""
  You are given a list of dictionaries, where each dictionary represents a Reddit post from the /SomebodyMakeThis subreddit.  
  Each post contains:
  - **title**: The original title of the Reddit post.
  - **body**: The full body of the Reddit post.
  - **url**: The url of the Reddit post.

  Your task is to:
  1. **Analyze the problem stated in the post.**  
  2. **If the post describes a solution or something already built, reframe it as if the poster is requesting the solution to be built.**  
  3. **Generate a concise and clear new title** that summarizes the core problem the poster is facing, NOT what they want to be built. The new title should reflect the issue the user is experiencing.  
  4. **Summarize the problem statement** into a concise, well-structured description that clearly explains what the user is requesting to be built.
  5. **Assign each problem to a category** based on its theme. The categories are:
    - **Finance** (e.g., budgeting apps, investment tools)  
    - **Productivity** (e.g., task management, automation tools)  
    - **Social** (e.g., networking platforms, communication apps)  
    - **Education** (e.g., learning tools, study aids)  
    - **Health/Fitness** (e.g., wellness apps, exercise trackers)  
    - **Others** (this should be the LAST resort if none of the above fit. Use this sparingly)

  ### **Return Format**
  Return a list of dictionaries with this format only, **without** any extra keywords or formatting (like json or python):
  [
    {{"title": "<new_title>", "body": "<summary_of_the_problem>", "url": <original_url>, "category": "<assigned_category>"}}
  ]
  Here is the list of posts for you to analyze: {posts}
  """
  )

  try:
    posts = response.text.strip('`').strip()
    posts = json.loads(posts)
    return(posts)

  except json.JSONDecodeError as e:
      print("Error: Invalid JSON -", e)


def store_in_db():
  db = SessionLocal()
  posts = parse_posts()

  try:
    for post in posts:
        #existing_post = db.query(models.Problems).filter(models.Problems.reddit_id == post['reddit_id']).first()
            
        #if existing_post:
          #continue
        new_post = models.Problems(
          #reddit_id = post['reddit_id'],
          title = post['title'],
          body =  post['body'],
          category = post['category'],
          url = post['url']
          )
        db.add(new_post)

    db.commit()
    print(f"Successfully added {len(posts)} posts to the database.")

  except SQLAlchemyError as e:
    print(f"{e}")
  finally:
    db.close()

store_in_db()    