import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
require('dotenv').config({ path: 'apps/admin/.env' });
import * as schema from "./schema";

const DATABASE_URL = process.env.DATABASE_URL;
console.log('process.env.DATABASE_URL', DATABASE_URL);

const sql = neon(DATABASE_URL!);
// @ts-ignore
const db = drizzle(sql, { schema });

export default db;