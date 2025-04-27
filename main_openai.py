import requests
from langchain_openai import ChatOpenAI
from browser_use import Agent
import asyncio
from dotenv import load_dotenv
load_dotenv()

API_BASE_URL = 'https://search.linkd.inc/api'
API_KEY = 'lk_a49cef94184e4f2385a170ae3640e8d1'

HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {API_KEY}',
}

def search_users(query, limit=10, school=None):
    """
    Search users via the Linkd API.
    :param query: The search query string.
    :param limit: Number of results to return.
    :param school: List of school names (optional).
    :return: JSON response from the API.
    """
    params = {
        'query': query,
        'limit': limit,
    }
    if school:
        params['school'] = school

    url = f"{API_BASE_URL}/search/users"
    response = requests.get(url, headers=HEADERS, params=params)
    if response.status_code == 401:
        raise Exception("Invalid or expired API key")
    response.raise_for_status()
    return response.json()

async def run_browser_use_agent(task_statement):
    agent = Agent(
        task=task_statement,
        llm=ChatOpenAI(model="gpt-4o"),
    )
    await agent.run()

# Example usage:

if __name__ == "__main__":
    try:
        print("Searching...")
        data = search_users(
            "People working on AI at FAANG",
            limit=5,
            school="University of California, Los Angeles"
        )

        companies = []
        urls = []
        for user in data.get("results", []):
            if user.get("experience"):
                companies.append(user["experience"][0]["company_name"])
            if user.get("profile"):
                urls.append(user["profile"][0]["linkedin_url"])

        companies_str = ", ".join(f"'{c}'" for c in companies)
        url_str       = ", ".join(f"'{u}'" for u in urls)

        task_statement = (
            f"Login to LinkedIn and send a personalized connection request to the people found whose profile URLs are [{url_str}]. "
            f"Go find current internship listings at these companies [{companies_str}]. "
            "My LinkedIn is linkedinpremiumdemo@gmail.com and password is Linkedindemo26. "
            "Make sure to click the 'Sign in with Google' button instead of the default LinkedIn form. "
            "Tell me which internships are available."
        )

        print(task_statement)
        asyncio.run(run_browser_use_agent(task_statement))

    except Exception as e:
        print("Error:", e)
