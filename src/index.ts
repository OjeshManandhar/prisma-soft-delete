require('dotenv').config();

// packages
import express from 'express';

// env
import { PORT } from './env_config';

const app = express();

app.use(express.json());
app.use(express.urlencoded());

app.post('/test/:slug', (req, res, next) => {
  console.log('body:', req.body);
  console.log('param:', req.params);
  console.log('query:', req.query);
  next();
});

app.use('/', (req, res) => {
  res.send('Welcome to ' + req.url);
});

app.listen(PORT, () => {
  console.log('Listening in PORT: ' + PORT);
});

console.log('Hello world');
