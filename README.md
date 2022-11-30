# Price Deck
A price comparision website
## Local Installation
1.  Open terminal in the folder where you want to save the code file. 
2.  Clone repository by using this command `git clone https://github.com/cmdsiraj/PriceDeck.git`.
3.  Go to folder PriceDeck. you can use this command to navigate to that direcotry `cd .\PriceDeck\`.
4.  Installing dependencies: `npm install`.
5.  jump from 'cd' to 'flask-server' with the help of command  `cd .\flask-server\`.
6.  Creating Virtualenvironment with the help of command `virtualenv venv`.
7.  Activate virtual environment using command `venv/Scripts/activate`.
8.  Download required libraries using the following command `pip install -r requirements.txt`
9.  Now, all the setup is ready. 
10. Open a terminal in PriceDeck Folder and execute `npm start` to start react server. 
11. Open other termianal in flask-server folder and execute `python server.py` to start our python server. 
12. Open browser and go to `http://localhost:3000/`.
13. The app is up and ready to use. 

## Description about folders

1. `flask-server` this is our main folder. this is where server where scrapping processing takes place. 
2. `src` folder contain all the files of user interface of the application.

## files in flask-server

Inside flask server, we have this following files `server.py`, 'scraper.py`, 'data.py`, 'alert.py` and `requirements.txt`.

1) `server.py` this is main server. this recives the requests from our react application. 
2) `scraper.py` this contains our scrapping functions. 
3) `data.py` this contains data which is used by `scraper.py`. this data is about the classes, tag and attributes and links that we need to scrape `flipkart` and `amazon` websites. 
4) `alert.py` this contians code which regularly checks for price drop of products which are choosen by users and send mails about price drop to the products to respective products. 
5) `requirements.txt` contains details about libraries that are required by `.py` files. 
