import requests
from bs4 import BeautifulSoup

url = "https://holidayz.makemytrip.com/holidays/india/search?depCity=Mumbai&dest=Delhi"

r = requests.get(url)
soup = BeautifulSoup(r.content, 'html.parser')
print(soup.find("title"))

# print(soup.find("div", class_="slick-list"))