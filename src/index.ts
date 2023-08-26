if (!process.env.ALREADY_SET) { require('dotenv').config(); }

import * as http from 'http';
import { app } from './app';
import { DatabaseService } from './app/services/DatabaseService';
// import { Logger } from './lib/logger';
import { connectDB } from './app/services/source';
// Composition root

// const logger: any = new Logger();

connectDB().then(() => {
  const server = http.createServer(app).listen(parseInt(process.env.PORT || '3000', 10));
  server.on('listening', async () => {
    // logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
  });
  // logger.log('info', `Sample app listening on ${JSON.stringify(server.address())}`);
})