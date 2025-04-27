from http.server import HTTPServer, SimpleHTTPRequestHandler
import webbrowser
import os
import asyncio
import requests
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from browser_use import Agent
import threading
import json
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS


load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
LINKD_API_KEY  = os.getenv("LINKD_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set in environment")
if not LINKD_API_KEY:
    raise RuntimeError("LINKD_API_KEY not set in environment")

os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY

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
    # 3) Instantiate with model_name (and your key will be picked up from GOOGLE_API_KEY)
    # model = ChatGoogleGenerativeAI(model="gemini-2.5-flash-preview-04-17")
    model = ChatGoogleGenerativeAI(model="gemini-2.5-flash-preview-04-17")
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
    print("Received form data:", form_data)
    
    # Process the form data
    open_sesame()
    
    return jsonify({"status": "success", "message": "Form data processed"})

def start_server():
    port = 8000  # Use a single port for everything
    print(f"Server listening on http://localhost:{port}")
    webbrowser.open(f'http://localhost:{port}')
    app.run(host='localhost', port=port, debug=True)

def open_sesame():
    print("Searching...")
    data = search_users(
        "People working on AI at FAANG",
        limit=5,
        school="University of California, Los Angeles"
    )

    companies = []
    urls = []
    for user in data.get("results", []):
        for experience in user.get("experience"):
            companies.append(experience["company_name"])
        if user.get("profile"):
            urls.append(user["profile"]["linkedin_url"])

    companies_str = ",".join(companies)

    url_str       = ",".join(urls)

    profile = "Rahut Taeudomkul (rahut@ucla.edu, 310-696-8877) is a UCLA Chemical and Biomolecular Engineering student (GPA 3.82, major GPA 3.96) with internships at TSMC (incoming), Innobic (strategy), and Benchmark Electronics (product engineering), research experience in machine learning droplet analysis at Peterson Research Group, leadership roles at AIChE UCLA, a publication in Molecules (2021) on liquid crystals, technical projects in carbon capture, process engineering, and Arduino device building, and skills in Python, C++, CAD, MATLAB, LaTeX, Excel, with awards including LA Tech Week Hackathon finalist and placements in international math and economics competitions."

    task_statement_1 = (
        f"Login to LinkedIn and send a personalized connection request to the people found whose profile URLs are [{url_str}]. "
        "Create a personalized message that links our personal experience to their own experience in their latest company and politely ask for a referral."
        "My LinkedIn is linkedinpremiumdemo@gmail.com and password is Linkedindemo26. "
        "Make sure to click the 'Sign in with Google' button instead of the default LinkedIn form. "
    )

    # acceptable companies: rockstar, acorn
    task_statement_2 = (
        f"Go find any job at [ Rockstar ]. Go into their careers page."
        "Once you found one. APPLY TO IT."
        "No need to find a relevant job. Just find any job. in any place in the world." 
        f"my profile is {profile}"
        "not a veteran. not disabled. asian, male. If there are no questions about this, just skip it. If there is a submit button, click it."
    )

    async def main():
        print(task_statement_1)
        #t1 = asyncio.create_task(run_browser_use_agent(task_statement_1))
        print(task_statement_2)
        t2 = asyncio.create_task(run_browser_use_agent(task_statement_2))
        #await asyncio.gather(t1, t2)
        await asyncio.gather(t2)

    asyncio.run(main())

if __name__ == "__main__":
    start_server()