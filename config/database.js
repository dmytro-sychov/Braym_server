import mongoose from 'mongoose';
import logger from '../logger/logger.js';

class DbService {
  constructor() {
    this.db = null;
  }

  async connect(url) {
    try {
      await mongoose.connect(url);

      this.db = mongoose.connection;
    } catch (error) {
      logger.error(error);

      process.exit(1);
    }
  }

  getDb() {
    if (!this.db) {
      logger.error('Db has not been initialized. Please call connect first.');
    }

    return this.db;
  }
}

export default new DbService();
