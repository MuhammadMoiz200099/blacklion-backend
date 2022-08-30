import { Application } from 'express';
import path from 'path';

import api from './api';
const staticPath = path.join(__dirname, "./dist");


export default function routes(app: Application): void {
  console.log(staticPath);
  app.use('/api', api);
  app.all("/*", (_, res) => {
    res.sendFile('index.html', { root: staticPath });
  });
}
