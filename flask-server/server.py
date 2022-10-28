from flask import Flask
import re
from flask_cors import CORS
from operator import itemgetter

from scraper import scrape
from data import get_data_to_scrape

app = Flask(__name__)
CORS(app)


@app.route("/")
def main():
    return {"Message": "Hello Welcome!"}


@app.route("/scrape/<product>")
def scraper_main(product="tv"):
    product = re.sub(" ", "+", product)
    flipkart_data_to_scrape = get_data_to_scrape("flipkart", product)
    amazon_data_to_scrape = get_data_to_scrape("amazon", product)

    data_list = []

    for data in scrape(flipkart_data_to_scrape):
        data_list.append(data)

    for data in scrape(amazon_data_to_scrape):
        data_list.append(data)

    data_list = [d for d in data_list if d['Price']
                 is not None and d['Link'] is not None]

    data_list = sorted(data_list, key=lambda i: i['Price'])

    return data_list


if __name__ == '__main__':
    app.run(debug=True)
