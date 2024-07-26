// test/sqlite-wrapper.test.js

import { UniversalSQLite } from './index.js';

describe('UniversalSQLite', () => {
  let db;
  const testDbPath = ':memory:';

  beforeEach(async () => {
    db = new UniversalSQLite(testDbPath);
    await db.init();
  });

  afterEach(async () => {
    await db.close();
  });

  test('should create a new database', async () => {
    await expect(db.execute('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)')).resolves.not.toThrow();
  });

  test('should execute a query', async () => {
    await db.execute('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
    await db.execute('INSERT INTO test (name) VALUES (?)', ['Test Name']);
    const result = await db.query('SELECT * FROM test');
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Test Name');
  });

  test('should handle multiple queries', async () => {
    await db.execute('CREATE TABLE test (id INTEGER PRIMARY KEY, name TEXT)');
    await db.execute('INSERT INTO test (name) VALUES (?)', ['Name 1']);
    await db.execute('INSERT INTO test (name) VALUES (?)', ['Name 2']);
    const result = await db.query('SELECT * FROM test');
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe('Name 1');
    expect(result[1].name).toBe('Name 2');
  });

  test('should throw an error for invalid SQL', async () => {
    await expect(db.execute('INVALID SQL')).rejects.toThrow();
  });

  test('should throw an error when querying closed database', async () => {
    await db.close();
    await expect(db.query('SELECT 1')).rejects.toThrow('Database is not initialized');
  });
});