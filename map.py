import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import xml.etree.ElementTree as ET
from datetime import date

BASE_URL = "http://localhost:3000"  # change to your local port
visited = set()
pages = []

def crawl(url):
    if url in visited or not url.startswith(BASE_URL):
        return
    visited.add(url)
    try:
        res = requests.get(url)
        soup = BeautifulSoup(res.text, "html.parser")
        title = soup.title.string.strip() if soup.title else ""
        pages.append({"url": url, "title": title})
        for a in soup.find_all("a", href=True):
            crawl(urljoin(url, a["href"]))
    except:
        pass

crawl(BASE_URL)