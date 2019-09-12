const express = require('express');
const bodyParser = require('body-parser');
const News = require('../../models/news');

module.exports = function() {
  let router = express.Router();

  router.get('/', bodyParser.json(), async (req, res, next) => {
    let limit = parseInt(req.query.limit);
    let offset = parseInt(req.query.offset);

    if(isNaN(limit)){
        res.status(400).send({success: false, error: 'Limit is not a number. Please try again.'})
        return;
    }
    if(isNaN(offset)){
        res.status(400).send({success: false, error: 'Offset is not a number. Please try again.'})
        return;
    }    

    try {
      let news = await News.find()
        .skip(offset)
        .limit(limit)
        .exec();
      res.status(200).send({ success: true, news });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .send({
          success: false,
          error: 'Error occurred trying to get records. Try again later.'
        });
    }
  });

  return router;
};
