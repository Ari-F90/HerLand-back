/* eslint-disable no-unused-expressions */
import mongoose from 'mongoose';
import { dbConnect } from './db.connect';

describe('Given the dbConnect function', () => {
  describe('When NODE_ENV !== test', () => {
    test('Then it should be a connection to the dbName', async () => {
      const result = await dbConnect('dev');
      expect(typeof result).toBe(typeof mongoose);
      expect(mongoose.connection.db.databaseName).not.toContain('Testing');
      mongoose.disconnect();
    });
  });
  describe('When NODE_ENV === test', () => {
    test('Then it should be a connection to the testing dbName', async () => {
      const result = await dbConnect();
      expect(typeof result).toBe(typeof mongoose);
      expect(mongoose.connection.db.databaseName).toContain('Testing');
      mongoose.disconnect();
    });
  });
});
