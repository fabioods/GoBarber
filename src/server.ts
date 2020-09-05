/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';

const app = express();
app.use(express.json());
app.use(routes);

app.listen(7000, () => console.log('Server running on port 7000'));
