const pg = require('pg');
const Pool = pg.Pool;
const config = {
    database: 'tasks',
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000
};

const pool = new Pool(config);

module.exports = pool;