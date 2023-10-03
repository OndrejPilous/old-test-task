# Luxonis test task

## Task
Scrape the first 500 items (title, image url) from sreality.cz (http://sreality.cz/) (flats, sell - you can switch the web to English) and save it in the Postgresql database. Implement a simple HTTP server (or use Nginx) and show these 500 items on a nice page (with pagination) which will use your own design and put everything to single docker-compose command so that I can just run "docker-compose up" in the Github repository and see the scraped ads on http://127.0.0.1:8080 (http://127.0.0.1:8080/) pa
ge. Use Typescript and React for implementation

## Source

sreality.cz - http://sreality.cz/
probably the meant data - https://www.sreality.cz/hledani/byty
the action of changing pages is not network related - nohttps://www.sreality.cz/hledani/prodej/byty?strana=2

## stack

Front-end: ReactJS (with TS)

Back-end: node.js
- Express.js (html server)
- Puppeter (data scraping)
- pg-promise (api to PostgreSQL)

Database: PostgreSQL

## dev log

### backend
- imlemented TS and managed to get express.js api "hello world" running
