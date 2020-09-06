/* eslint-disable no-console */
import 'reflect-metadata';
import express from 'express';
import routes from './routes';
import './database';
import upload from './config/upload';

const app = express();
app.use(express.json());
app.use(routes);
app.use('/files', express.static(upload.directory));

app.listen(7000, () => console.log('Server running on port 7000'));
