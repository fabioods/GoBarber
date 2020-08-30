/* eslint-disable no-console */
import express from 'express';

const app = express();

app.get('/', (req, res) => res.json({ msg: 'hello world my friends' }));

app.listen(7000, () => console.log('Server running on port 7000'));
