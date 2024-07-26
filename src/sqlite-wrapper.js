export class UniversalSQLite {
  constructor(dbPath = './database.sqlite') {
    this.dbPath = dbPath;
    this.db = null;
  }

  async init() {
    if (!this.db) {
      this.db = await this.open({
        filename: this.dbPath,
        driver: this.sqlite3.Database
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

  // これらのメソッドは環境固有の実装で上書きされます
  async open() {
    throw new Error("Not implemented");
  }

  get sqlite3() {
    throw new Error("Not implemented");
  }
}
