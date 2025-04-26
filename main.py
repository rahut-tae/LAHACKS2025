import os
import asyncio
import requests
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from browser_use import Agent

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
    model = ChatGoogleGenerativeAI(model="gemini-2.0-flash")

    agent = Agent(task=task_statement, llm=model) 
    #agent.slow_mo = 500                          # slow things down so tabs have time to load

    await agent.run()

if __name__ == "__main__":
    try:
        data = search_users(
            "People working on AI at FAANG",
            limit=5,
            school="University of California, Los Angeles"
        )
        company_names = [
            u["experience"][0]["company_name"]
            for u in data.get("results", [])
            if u.get("experience")
        ]
        task = (
            "Send a connection request to the people found. Go find current internship listings at these companies: "
            + ", ".join(company_names)
            + ". My LinkedIn is linkedinpremiumdemo@gmail.com, password is Linkedindemo26. "
            + "Just tell me which internships are available."
        )
        print("Prompt →", task)
        asyncio.run(run_browser_use_agent(task))

    except Exception as e:
        print("Error:", e)
