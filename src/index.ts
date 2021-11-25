require('dotenv').config();

// packages
import express from 'express';

// routes
import postRoutes from './routes/post';
import userRoutes from './routes/user';

// env
import { PORT } from './env_config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user', userRoutes);
app.use('/post', postRoutes);

app.listen(PORT, () => {
  console.log('Listening in PORT: ' + PORT);
});

console.log('Hello world');
