import os
import asyncio
import requests
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from browser_use import Agent
import socket
import threading


load_dotenv()
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
LINKD_API_KEY  = os.getenv("LINKD_API_KEY")
if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY not set in environment")
if not LINKD_API_KEY:
    raise RuntimeError("LINKD_API_KEY not set in environment")

os.environ["GOOGLE_API_KEY"] = GEMINI_API_KEY

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
            # Echo back for now - modify as needed
            conn.send(data)
        except:
            break
    conn.close()

def start_server():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    port = 8505
    server.bind((socket.gethostname(),port))
    server.listen(5)
    print(f"Server listening on port {port}")
    
    while True:
        conn, addr = server.accept()
        thread = threading.Thread(target=handle_client, args=(conn, addr))
        thread.daemon = True
        thread.start()

# Start socket server in background thread
server_thread = threading.Thread(target=start_server)
server_thread.daemon = True
server_thread.start()

if __name__ == "__main__":
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

    profile = "Chaidhat Chaimongkol | (424) 535-9679 | chaimongkol@ucla.edu | linkedin.com/in/chaidhat | github.com/chaidhat | UCLA B.S. in Computer Engineering, Minor in Entrepreneurship (Dean’s List 2x, Boeing Scholarship 2023-24), graduating June 2026. Founder of Scholarity Co., Ltd., building a full-stack E-Learning platform (Dart, React, TypeScript, MySQL) with 50,000+ lines, securing a Fortune 500 client and generating $12,000 revenue in year one; optimized backend performance by 7,200%; Google-backed hackathon finalist. Undergraduate Researcher at Di Carlo Lab, creating Python front-ends and Wi-Fi/Bluetooth robotic systems exhibited at SLAS 2025; and at Yijia Xiao Lab, building LLM-based financial trading analysis with LangChain and Model Control Protocol. Software Engineering Intern at PTG Energy Group and Software Engineer for Department of Industrial Works, architecting fleet/E-Learning web apps and safety checklist platforms (Dart, Flutter, NodeJS, MySQL) under a $119k contract. Leadership: Led 20-engineer Brain-Computer Interface team for EEG signal ML prototypes (California Neurotech Conference 2024) and commanded 18 engineers in UCLA’s Bruin Spacecraft Group for CubeSat software/hardware (C, Python, F Prime, PCB soldering). Avionics engineer at UCLA Rocket Project building electronic systems. Projects include building a C programming language compiler (x86-64 assembly) and a Boeing 777-300ER flight simulator (50,000+ downloads, Boeing Scholarship). Skills: C, C++, C#, Python, Java, HTML/CSS, JavaScript, TypeScript, React, SQL, Dart; PyTorch, TensorFlow, NodeJS, NextJS, Flask, Flutter, LangChain; Git, Docker, AWS, Figma, Linux; coursework in OS, Algorithms, Theoretical CS, Computer Vision ML, Electromagnetics, x86 assembly, Statistics, and Circuits."

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