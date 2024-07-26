import { Driver } from './driver.js';
import { UniversalSQLite } from './sqlite-wrapper.js';

UniversalSQLite.prototype.open = Driver.prototype.open;

export { UniversalSQLite };
