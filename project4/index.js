const express = require('express');
const path = require('path');
const { engine } = require('express-handlebars');
const logger = require('./middleware/logger');
const members = require('./Members');

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) =>
  res.render('index', {
    title: 'Member App',
    members
  })
);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/members', require('./routes/api/members'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));