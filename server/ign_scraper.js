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

        //div.blogrollContainer has a list of news elements on the site
        $('.blogrollContainer').filter(function() {
          let data = this;
          let children = data.childNodes;
          let entries = [];
          //Filtering through the children of the list to remove any unwanted tags and/or divs
          children.forEach(function(entry) {
            if ((entry.type && entry.name == 'div')) {
              entries.push(entry);
            }
          });
          //Remove the first element because it is not a "listElement (article)"
          entries.shift();
          entries.forEach(entry => {
              console.log(entry.childNodes[1].children[1].children[0].attribs.alt);
              console.log(entry.childNodes[1].children[1].children[0].attribs.src);
          })
        });
      }
    }
  );
};
