// src/sqlite-wrapper.d.ts

export class UniversalSQLite {
  constructor(dbPath?: string);
  async init(): Promise<void>;
  async execute(query: string, params: any[] = []): Promise<void>;
  async query<T extends any[]>(query: string, params: any[] = []): Promise<T>;
  async close(): Promise<void>;
}
