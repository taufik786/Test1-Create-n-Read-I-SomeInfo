const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');


require('./config/db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors:{ origin: '*' }});
require('./socket/autoRefresh')(io);

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/postRoutes');

app.use('/api', userRoutes);
app.use('/post', postRoutes);

server.listen(5000, () => {
  console.log('Server running on port : 5000');
})
