# This attempt is likely not working due to the following bug.

https://github.com/denoland/deno/issues/19666


# universal-sqlite

A universal SQLite wrapper for both Deno and Node.js environments, installable via npm.

## Installation

```bash
npm install universal-sqlite
```

## Usage

### Node.js

```javascript
import { UniversalSQLite } from 'universal-sqlite';

async function main() {
  // File-based database
  const fileDb = new UniversalSQLite('./my-database.sqlite');
  await fileDb.init();
  
  // In-memory database
  const memoryDb = new UniversalSQLite(':memory:');
  await memoryDb.init();
  
  await memoryDb.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
  await memoryDb.execute('INSERT INTO users (name) VALUES (?)', ['John Doe']);
  
  const users = await memoryDb.query('SELECT * FROM users');
  console.log(users);
  
  await fileDb.close();
  await memoryDb.close();
}

main().catch(console.error);
```

### Deno

```javascript
import { UniversalSQLite } from 'npm:universal-sqlite';

async function main() {
  const db = new UniversalSQLite(':memory:');
  await db.init();
  
  await db.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
  await db.execute('INSERT INTO users (name) VALUES (?)', ['John Doe']);
  
  const users = await db.query('SELECT * FROM users');
  console.log(users);
  
  await db.close();
}

main().catch(console.error);
```

## API

- `constructor(dbPath?: string)`: Create a new instance with the specified database path. If no path is provided or ':memory:' is used, an in-memory database will be created.
- `init()`: Initialize the database connection.
- `execute(query: string, params?: any[])`: Execute a SQL query with optional parameters.
- `query<T = any>(query: string, params?: any[]): Promise<T[]>`: Execute a SQL query and return the results.
- `close()`: Close the database connection.

## License

MIT