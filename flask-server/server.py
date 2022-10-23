from flask import Flask
import re

from scraper import scrape
from data import get_data_to_scrape

app = Flask(__name__)



@app.route("/scrape/<product>")
def members(product="tv"):
      product = re.sub(" ","+",product)
      flipkart_data_to_scrape = get_data_to_scrape("flipkart", product)
      amazon_data_to_scrape = get_data_to_scrape("amazon", product)

      data_list = []

      for data in scrape(flipkart_data_to_scrape):
            data_list.append(data)

      for data in scrape(amazon_data_to_scrape):
          data_list.append(data)

      data_list = [d for d in data_list if d['Price'] is not None]
      
      data_list = sorted(data_list,key=lambda i: i['Price'])

      return data_list
    
if __name__ == '__main__':
    app.run(debug=True)
