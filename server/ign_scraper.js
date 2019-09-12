const request = require('request');
const cheerio = require('cheerio');

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
      if (!error) {
        let $ = cheerio.load(html);
        let articles = [];
        
        //div.blogrollContainer has a list of news elements on the site
        $('.blogrollContainer').filter(function() {
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
                let article_link =
                  article.childNodes[1].children[1].attribs.href;

                articles.push({
                    title: article_title,
                    description: article_description,
                    image: article_image,
                    link: article_link,
                })
              } catch (err) {
                console.log(err);
              }
            }
          });
          articles.forEach(a => {
              console.log(a);
          })
        });
      }
    }
  );
};
