import createDebug from 'debug';
import http from 'http';
import { app } from './app.js';
import { dbConnect } from './db/db.connect.js';

const debug = createDebug('HER');
const PORT = process.env.PORT ?? 4500;

const server = http.createServer(app);

dbConnect()
  .then((mongoose) => {
    server.listen(PORT);
    debug('DB: HERLAND', mongoose.connection.db.databaseName);
  })
  .catch((error) => server.emit('error', error));

server.on('error', (error) => {
  debug('Server error:', error.message);
});

server.on('listening', () => {
  debug('Listening in http://localhost:' + PORT);
});
