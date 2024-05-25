const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    "postgresql://postgres:LEEoFEBjsjTvuLXjZyRcSFmXAjEDrFDl@viaduct.proxy.rlwy.net:17458/railway",
});

module.exports = pool;
