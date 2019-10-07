const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");

const app = express();
app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-d2kv2.mongodb.net/omnistack?retryWrites=true&w=majority', 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./routes'));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

server.listen(process.env.PORT || 3333);
