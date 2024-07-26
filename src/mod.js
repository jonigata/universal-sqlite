import { open } from 'https://deno.land/x/sqlite@v3.4.0/mod.ts';
import { UniversalSQLite } from './sqlite-wrapper.js';

class DenoSQLite extends UniversalSQLite {
  async open(options) {
    return open(options);
  }

  get sqlite3() {
    return { Database: {} };  // Denoの場合、これは実際には使用されません
  }
}

export { DenoSQLite as UniversalSQLit };
