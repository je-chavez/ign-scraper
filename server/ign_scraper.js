const request = require('request');
const cheerio = require('cheerio');
const News = require('../models/news');

module.exports = function() {
  let url = 'https://www.ign.com/articles?tags=news';
  request(
    {
      url: url,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36'
      }
    },
    function(error, response, html) {
      if (error) {
        console.log(
          `An error has occurred trying to request from IGN: ${error}`
        );
        return;
      }
      let $ = cheerio.load(html);
      let articles = [];

      //div.blogrollContainer has a list of news elements on the site
      $('.blogrollContainer').filter(async function() {
        let data = this;
        let children = data.childNodes;
        let entries = [];
        //Filtering through the children of the list to remove any unwanted tags and/or divs
        children.forEach(function(entry) {
          if (entry.type && entry.name == 'div') {
            entries.push(entry);
          }
        });
        //Remove the first element because it is not a "listElement (article)"
        entries.shift();
        entries.forEach(article => {
          if (article.childNodes) {
            try {
              //Get title
              let article_title =
                article.childNodes[3].childNodes[1].childNodes[0].data;

              //Get desciption of article
              let article_description =
                article.childNodes[3].childNodes[3].childNodes[1].data;

              //Get image preview
              let article_image =
                article.childNodes[1].children[1].childNodes[0].attribs.src;
              article_image = article_image.replace('_160w', '');

              //Get link to article
              let article_link = article.childNodes[1].children[1].attribs.href;

              articles.push(
                News({
                  title: article_title,
                  description: article_description,
                  image: article_image,
                  link: article_link
                })
              );
            } catch (err) {
              console.log(err);
            }
          }
        });
        try {
          let result = await News.insertMany(articles, { ordered: false });
          console.log(`Inserted ${result.length} into the database.`);
        } catch (err) {
          let e = err;
          if (e.name == 'BulkWriteError') {
            let insertedDocs = articles.length - e.writeErrors.length;
            console.log(`Inserted ${insertedDocs} into the database.`);
          } else {
            console.log(`An error occurred: ${e.name}`);
          }
        }
      });
    }
  );
};
