import createDebug from 'debug';
import mongoose from 'mongoose';
import { config } from '../config.js';

const debug = createDebug('HER: connect');

const { user, password, cluster, dbName } = config;

export const dbConnect = (env?: string) => {
  const finalEnv = env || process.env.NODE_ENV;
  const finalDBName = finalEnv === 'test' ? dbName + 'Testing' : dbName;
  const uri = `mongodb+srv://${user}:${password}@${cluster}/${finalDBName}?retryWrites=true&w=majority`;
  return mongoose.connect(uri);
};
