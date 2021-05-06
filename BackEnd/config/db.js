const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/Task1-Create-Read-Info', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Db connected successfully');
});
