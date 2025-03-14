# Aidea - Project Setup

Aidea uses the Reddit API and Gemini API to gather problems people are facing from various subreddits. This helps startup founders and developers discover real-world problems with real-world use cases.

This guide will help you set up the project and get it running locally.

## 1. Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/QuanGiap/Aidea-Website
```


## 2. Install Frontend Dependencies
Install the necessary dependencies:

```bash
npm install
```


## 3. Create .env File
In the root of the project, create a .env file and add the following environment variables:

```ini
DATABASE_URL=postgresql://<your-db-user>:<your-db-password>@localhost:5432/problems_db
REDDIT_CLIENT_ID=<your-reddit-client-id>
REDDIT_CLIENT_SECRET=<your-reddit-client-secret>
GEMINI_API_KEY=<your-gemini-api-key>
JWT_SECRET_KEY=<your-jwt-secret-key>
```
Make sure to replace the placeholder values with your actual credentials.



## 4. Set Up Virtual Environment

Create a virtual environment for Python and activate it:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows, use `python -m venv .venv`
```


## 5. Install Backend Dependencies
Navigate to the backend directory and install the required Python packages:

```bash
cd backend
pip install -r requirements.txt
```


## 6. Set up PostgreSQL database tables
After setting up your database, run the following command in server.py to create the required tables:

```bash
Base.metadata.create_all(bind=engine)
```


## 7. Get Reddit Data
To get real-world problems from Reddit, run the script in the backend directory:

```bash
cd backend
python script.py
```


## 8. Run the Backend Server
Start the backend server with Uvicorn:

```bash
uvicorn server:app --reload
```


## 9. Run the Frontend Development Server
In a separate terminal, navigate to the frontend directory and start the frontend development server:

```bash
npm run dev
```

You're all set! The project should now be running locally. Access the frontend in your browser and start exploring real-world problems.