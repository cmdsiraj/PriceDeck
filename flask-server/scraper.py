import bs4
from bs4 import BeautifulSoup
import requests
import re

def scrape(data):
    
  domain = data['domain']
  link = data['link']
  classes = data['classes']
  tags = data['tags']
  headers = data['headers']

  page = requests.get(link, headers=headers)


  soup = BeautifulSoup(page.content, 'lxml')

  main = soup.find(tags['main'], class_=classes['main'])

  products = main.find_all(tags['product_class'],classes['product_class'])

  product_name = None
  product_price = None
  product_link = None
  product_image = None

  my_data = []
  for i in range(0,len(products)-2):
    if type(products[i]) is bs4.element.Tag:
      try:
        product_name = products[i].find(tags['name'], class_=classes['name']).get_text()
      except:
        product_name = None
      
      try:
        product_price = products[i].find(tags['price'], class_=classes['price']).get_text()
      except:
        product_price = None
      
      try:
        product_link = domain+products[i].find(tags['link'], class_=classes['link'])['href']
      except:
        product_link = None
      
      try:
        product_image = products[i].find(tags['image'], class_=classes['image'])['src']
      except:
        product_image = None
        


    data = {
        'Name': product_name,
        'Price': product_price,
        'Link': product_link,
        'Image': product_image,
        'Website': domain.split('.')[1].upper()
      }

    yield data

#   return my_data
    