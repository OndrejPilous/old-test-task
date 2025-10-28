# Old test task - not maintained
This is test task for job interview.

** It has been some time, so it is possible that the scraping won't work properly **

## Task
Scrape the first 500 items (title, image url) from sreality.cz (http://sreality.cz/) (flats, sell - you can switch the web to English) and save it in the Postgresql database. Implement a simple HTTP server (or use Nginx) and show these 500 items on a nice page (with pagination) which will use your own design and put everything to single docker-compose command so that I can just run "docker-compose up" in the Github repository and see the scraped ads on http://127.0.0.1:8080 (http://127.0.0.1:8080/) pa
ge. Use Typescript and React for implementation

## Usage guide
- use docker-compose up in the root directory
- everything will beggin seting up and the aplication will scrape the source
- please be patient, this process may take a while ( ! Currently there is no loading screen functionality so the web app will look weird and you may need to refresh the site after some time)

## Source

sreality.cz - http://sreality.cz/
probably the meant data - https://www.sreality.cz/hledani/byty
the action of changing pages is not network related - https://www.sreality.cz/hledani/prodej/byty?strana=2

## stack

Front-end: ReactJS (with TS)

Back-end: node.js
- Express.js (html server)
- Puppeter (data scraping)
- pg-promise (api to PostgreSQL)

Database: PostgreSQL

## notes
This is rough version. It works but there are definetly ways to improve, comment and bug test.

Also because of time sensitivity I didn't have time to implement some sort of loading screen. So it is needed to wait for scraping to finish and perhaps refresh the page. Saidly I didn't have time to test it.

The goal was writen very open way so I picked some ways I found interesting and practical.

I've never done similar project and learned a lot.

## end note
Please keep in mind this is only for learning and practice purposes. Every content gathered by this application still belongs to sreality.cz. 
