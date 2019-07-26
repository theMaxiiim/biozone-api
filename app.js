const restify = require('restify');
const mongoose = require('mongoose');
const config = require('./config');

const server = restify.createServer();

// middleware
server.use(restify.plugins.bodyParser());
server.use(restify.plugins.queryParser({ mapParams: true }));

server.listen(config.PORT, () => {
  mongoose.set('useFindAndModify', false);
  mongoose.connect(config.MONGODB_URI, {
    useNewUrlParser: true
  });
});

const db = mongoose.connection;

db.on('error', (err) => console.log(err));

db.once('open', () => {
  require('./routes/keywords')(server);
  console.log(`Server started on port ${config.PORT}`);
});