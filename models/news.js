const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const NewsSchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String,
      unique: true,
      required: true
    },
    link: {
      type: String,
      unique: true,
      required: true
    },
    image: {
      type: String,
      required: true
    }
  },
  {
    collection: 'News'
  }
);

const News = mongoose.model('News', NewsSchema);
module.exports = News;
