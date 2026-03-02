import { Pool } from "pg";

const db = new Pool({
  host: "127.0.0.1",
  database: "ikonoijoy_map",
});

export default db;
