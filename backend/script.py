import praw
import os
from dotenv import load_dotenv
from google import genai

# subreddits: personal finance, productivity, healthcare
# https://www.reddit.com/r/SomebodyMakeThis/, 
load_dotenv(dotenv_path='../.env')

reddit = praw.Reddit(
  client_id = os.getenv("REDDIT_CLIENT_ID"),
  client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
  user_agent="test",
)


posts = []
for post in reddit.subreddit("SomebodyMakeThis").new(limit=5):
  if ("Monthly Thread" in post.title):
    continue
  row = {
    "title": post.title,
    "body": post.selftext
  }
  posts.append(row)

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
response = client.models.generate_content(
  model="gemini-2.0-flash", 
  contents  = f"""
You are given a list of dictionaries, where each dictionary represents a Reddit post from the /SomebodyMakeThis subreddit.  
Each post contains:
- **title**: The original title of the Reddit post.
- **text**: The full text of the Reddit post.

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
   - **Others** (if none of the above fit)

### **Return Format**
Return a list of dictionaries in the following format:
```json
[
  {{"title": "<new_title>", "text": "<summary_of_the_problem>", "category": "<assigned_category>"}}
]
Here is the list of posts for you to analyze: {posts}
"""

)
posts = response.text
print(posts)
