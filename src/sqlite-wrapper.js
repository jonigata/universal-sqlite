// sqlite-wrapper.js

const isDenoRuntime = typeof Deno !== 'undefined';

let sqlite3;
let open;
let initializationPromise = null;

async function initializeSqlite() {
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = (async () => {
    if (isDenoRuntime) {
      const denoSqlite = await import('https://deno.land/x/sqlite@v3.4.0/mod.ts');
      sqlite3 = denoSqlite;
      open = denoSqlite.open;
    } else {
      const nodeSqlite = await import('sqlite3');
      const nodeOpenSqlite = await import('sqlite');
      sqlite3 = nodeSqlite.default;
      open = nodeOpenSqlite.open;
    }
  })();

  return initializationPromise;
}

class UniversalSQLite {
  constructor(dbPath = './database.sqlite') {
    this.dbPath = dbPath;
    this.db = null;
  }

  async init() {
    await initializeSqlite();
    if (!this.db) {
      this.db = await open({
        filename: this.dbPath,
        driver: sqlite3.Database
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

export { UniversalSQLite };
