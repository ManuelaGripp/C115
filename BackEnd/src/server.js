const express = require('express');
const cors = require('cors');
const db = require('./database.js');
const routes = require('./routes.js');

const app = express();

app.use(express.json());
app.use(cors());
db.connect()

const PORT = 3000;

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
