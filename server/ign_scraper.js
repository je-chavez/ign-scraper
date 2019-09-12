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
        $('.blogrollContainer').filter(() => {
            let data = this;
            console.log(data);
        });
      }
    }
  );
};
