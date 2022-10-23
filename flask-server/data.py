def get_data_to_scrape(website, product):
    HEADERS = ({'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Accept-Language': 'en-US, en;q=0.5'})

    product_to_search = product

    if website == "amazon":
        domain = 'https://www.amazon.in/'
        link = f'https://www.amazon.in/s?k={product_to_search}'
        classes = {
            'main': 's-main-slot s-result-list s-search-results sg-row',
            'product_class': 's-result-item s-asin sg-col-0-of-12 sg-col-16-of-20 sg-col s-widget-spacing-small sg-col-12-of-16',
            'name': 'a-size-medium a-color-base a-text-normal',
            'price': 'a-offscreen',
            'link': 'a-link-normal s-underline-text s-underline-link-text s-link-style a-text-normal',
            'image': 's-image'
        }

        tags = {
            'main': 'div',
            'product_class': 'div',
            'name': 'span',
            'price': 'span',
            'link': 'a',
            'image': 'img'
        }

        return { 'domain': domain, 'link': link, 'classes': classes, 'tags': tags, 'headers': HEADERS }
    
    elif website == 'flipkart':
        link = f'https://www.flipkart.com/search?q={product_to_search}'
        domain = 'https://www.flipkart.com'
        classes = {
            'main': '_1YokD2 _3Mn1Gg',
            'product_class': '_1AtVbE col-12-12',
            'name': '_4rR01T',
            'price': '_30jeq3',
            'link': '_1fQZEK',
            'image': '_396cs4 _3exPp9'
        }   
        tags = {
            'main': 'div',
            'product_class': 'div',
            'name': 'div',
            'price': 'div',
            'link': 'a',
            'image': 'img'
        }

        return { 'domain': domain, 'link': link, 'classes': classes, 'tags': tags, 'headers': HEADERS }