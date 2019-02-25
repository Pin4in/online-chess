const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const config = require('config');

mongoose.set('debug', config.get('mongodb.debug'));
mongoose.plugin(beautifyUnique);
mongoose.set('useCreateIndex', true)
mongoose.connect(config.get('mongodb.uri'), { useNewUrlParser: true })
  .then(() => console.log('connecting to database successful'))
  .catch(err => console.error('could not connect to mongo DB', err));

module.exports = mongoose;
