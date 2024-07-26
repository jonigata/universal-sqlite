# universal-sqlite

A universal SQLite wrapper for both Deno and Node.js environments.

## Installation

### Node.js

```bash
npm install universal-sqlite
```

### Deno

No installation needed. You can import directly in your code.

## Usage

### Node.js

```javascript
import { UniversalSQLite } from 'universal-sqlite';

async function main() {
  const db = new UniversalSQLite('./my-database.sqlite');
  await db.init();
  
  await db.execute('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT)');
  await db.execute('INSERT INTO users (name) VALUES (?)', ['John Doe']);
  
  const users = await db.query('SELECT * FROM users');
  console.log(users);
  
  await db.close();
}

main().catch(console.error);
```

### Deno

```javascript
import { UniversalSQLite } from 'https://deno.land/x/universal_sqlite/mod.js';

async function main() {
  const db = new UniversalSQLite('./my-database.sqlite');
  await db.init();
  
  // ... (same as Node.js example)
}

main().catch(console.error);
```

## API

- `constructor(dbPath)`: Create a new instance with the specified database path.
- `init()`: Initialize the database connection.
- `execute(query, params?)`: Execute a SQL query with optional parameters.
- `query(query, params?)`: Execute a SQL query and return the results.
- `close()`: Close the database connection.

## License

MIT
