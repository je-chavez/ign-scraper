# Description
This is a simple IGN web scraper that retrieves news from their site. I set it up to have a server that is scraping at a 15 minute interval and a "client" application that would handle the distribution of news. 

Since sites always change, this scraper will need to be updated from time to time. If you use this and notice that the tool no longer pulls the correct information, please let me know! I will update it accordingly. 

# What I Learned
In order to make this scraper I needed to use the following:
  * Expressjs
  * Cheerio
  * MongoDB
  * Mongoose
  * Nodejs

# Instructions
This project uses Node.js and MongoDB. 

To setup MongoDB (steps using Docker): 
  * Open terminal and run **docker pull mongo:4.0.4**
  * Run **docker run -d -p 27017-27019:27017-27019 --name mongodb mongo:4.0.4**

To run the Node project, complete the following:
  * Run **npm install**
  * For the **server**, run **node ./server/app**
  * For the **client**, run **node ./client/app**

  
