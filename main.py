from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import os
import asyncio
import requests
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from browser_use import Agent
import threading
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS


load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
LINKD_API_KEY  = os.getenv("LINKD_API_KEY")
if not OPENAI_API_KEY:
    raise RuntimeError("OPENAI_API_KEY not set in environment")
if not LINKD_API_KEY:
    raise RuntimeError("LINKD_API_KEY not set in environment")

os.environ["GOOGLE_API_KEY"] = OPENAI_API_KEY

# Create Flask app
app = Flask(__name__, static_folder='.')
CORS(app)  # Enable CORS for all routes

API_BASE_URL = "https://search.linkd.inc/api"
HEADERS = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {LINKD_API_KEY}",
}

def search_users(query, limit=10, school=None):
    params = {"query": query, "limit": limit}
    if school:
        params["school"] = school
    resp = requests.get(f"{API_BASE_URL}/search/users", headers=HEADERS, params=params)
    resp.raise_for_status()
    return resp.json()

async def run_browser_use_agent(task_statement: str):
    # Use OpenAI's ChatGPT model
    model = ChatOpenAI(model="gpt-4o", api_key=OPENAI_API_KEY)
    agent = Agent(
        task=task_statement, 
        llm=model,
        available_file_paths=["~/Downloads/resume-chaidhat-chaimongkol.pdf"]
    ) 
    credentials={
        "google.com": {
            "username": "linkedinpremiumdemo@gmail.com",
            "password": "Linkedindemo26"
        }
    }

    await agent.run()

def handle_client(conn, addr):
    print(f"New connection from {addr}")
    while True:
        try:
            data = conn.recv(1024)
            if not data:
                break
            # Parse the received JSON data
            form_data = data.decode('utf-8')
            print("Received form data:", form_data)
            
            # Here you can process the form data and trigger open_sesame()
            open_sesame()
            
            # Send success response back
            response = "Form data processed successfully"
            conn.send(response.encode('utf-8'))
        except Exception as e:
            print(f"Error processing request: {e}")
            break
    conn.close()

# Serve static files (HTML, CSS, etc.)
@app.route('/', defaults={'path': 'index.html'})
@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

# Handle form submission
@app.route('/submit', methods=['POST'])
def submit_form():
    form_data = request.json
    print(form_data)
    print("Received form data:", form_data)
    
    # Process the form data
    open_sesame(form_data["experienceLevel"], form_data["industry"], form_data["userPreferences"])
    
    return jsonify({"status": "success", "message": "Form data processed"})

def start_server():
    port = 8000  # Use a single port for everything
    print(f"Server listening on http://localhost:{port}")
    webbrowser.open(f'http://localhost:{port}')
    app.run(host='localhost', port=port, debug=True)

def open_sesame(experienceLevel, industry, userPreferences):
    print("Searching...")
    # data = search_users(
    #     f"People who work at {industry} industry and have {experienceLevel} experience.",
    #     limit=5,
    #     school="University of California, Los Angeles"
    # )

    # companies = []
    # urls = []
    # for user in data.get("results", []):
    #     for experience in user.get("experience"):
    #         companies.append(experience["company_name"])
    #     if user.get("profile"):
    #         urls.append(user["profile"]["linkedin_url"])

    # companies_str = ",".join(companies)
    # url_str       = ",".join(urls)
    # print(companies_str)

    profile = "Logan Reyes – reyes@ucla.edu - +4245359679 - no website- Software Engineer with 3+ years of experience in C++, Unreal Engine, and networked multiplayer systems; contributed to modding communities for GTA V and RDR2; built proprietary AI-driven NPC behavior tools; B.S. in Computer Science from University of Texas at Austin; former gameplay programmer intern at Insomniac Games; passionate about open-world design, procedural generation, and real-time physics simulation; fluent in Python, Lua, and low-level engine debugging."

    task_statement_1 = (
        f"Login to LinkedIn and "
        "1. search for a recruiter who works at Google."
        "2. click into their profile. Scroll down on their profile and memorize something they did."
        "2. send a personalized connection request to them. Use their experience and tie it in with yours somehow. Lie if you need to. IT MUST NOT EXCEED 200 CHARACTERS."
        f"my profile is {profile}"
        "Do not connect with Fernando."
        "My LinkedIn is linkedinpremiumdemo@gmail.com and password is Linkedindemo26."
        "Make sure to click the 'Sign in with Google' button instead of the default LinkedIn form. "
    )

    # acceptable companies: rockstar, acorn
    task_statement_2 = (
        f"Go find any job at [ Rockstar ]. Go into their careers page."
        "Once you found a mid-level job. APPLY TO IT."
        "No need to find a relevant job. Just find any job. in any place in the world." 
        "For the 'Rockstar Games Application/Data Privacy Consent' -> put in 'I Have Read'"
        "You can work anywhere."
        f"my profile is {profile} mention a lot about my past projects specifically"
        "not a veteran. not disabled. asian, male. If there are no questions about this, just skip it. If there is a submit button, click it."
    )

    async def main():
        #print(task_statement_1)
        #t1 = asyncio.create_task(run_browser_use_agent(task_statement_1))
        print(task_statement_2)
        t2 = asyncio.create_task(run_browser_use_agent(task_statement_2))

    asyncio.run(main())

if __name__ == "__main__":
    start_server()