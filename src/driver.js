// Node.js用のSQLiteクラス
class NodeSQLiteDriver {
  async open(options) {
    const sqlite3 = await import('sqlite3');
    const { open } = await import('sqlite');
    return open({
      ...options,
      driver: sqlite3.default.Database
    });
  }
}

// Deno用のSQLiteクラス
class DenoSQLiteDriver {
  async open(options) {
    const { open } = await import('https://deno.land/x/sqlite@v3.4.0/mod.ts');
    return open(options);
  }

  get sqlite3() {
    return { Database: {} }; // Denoの場合、実際には使用されません
  }
}

// 環境に応じて適切なクラスをエクスポートする
function determineEnvironment() {
  try {
    if (typeof Deno !== 'undefined') {
      return DenoSQLiteDriver;
    }
  } catch (error) {
    // Deno オブジェクトがない場合は Node.js とみなす
  }
  return NodeSQLiteDriver;
}

const Driver = determineEnvironment();
export { Driver };
