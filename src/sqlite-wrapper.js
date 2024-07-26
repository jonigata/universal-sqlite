export class UniversalSQLite {
  constructor(dbPath = './database.sqlite') {
    this.dbPath = dbPath;
    this.db = null;
  }

  async init() {
    if (!this.db) {
      this.db = await this.open({
        filename: this.dbPath
      });
    }
  }

  async execute(query, params = []) {
    if (!this.db) throw new Error("Database is not initialized");
    await this.db.run(query, params);
  }

  async query(query, params = []) {
    if (!this.db) throw new Error("Database is not initialized");
    return this.db.all(query, params);
  }

  async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}
