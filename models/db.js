import pg from "pg";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();
const db = new pg.Pool({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});
const dbCreateSql = fs.readFileSync("./models/db-create.sql", "utf8");
const tableCreateSql = fs.readFileSync("./models/table-create.sql", "utf8");
db.connect()
    .then(async client => {
        try {
            const dbExistsResult = await client.query(`SELECT 1 FROM pg_database WHERE datname = '${process.env.PG_DATABASE}'`);
            const dbExists = dbExistsResult.rows.length > 0;
            if (!dbExists) {
                await client.query(dbCreateSql);
                console.log("Database created successfully");
            } else {
                console.log("Database already exists, skipping creation");
            }


            await client.query(tableCreateSql);
            console.log("Tables created successfully");
            client.release();
        } catch (error) {
            console.error("Error executing SQL:", error);
            client.release();
        }
    })
    .catch(error => {
        console.error("Error connecting to the database:", error);
    });

export default db;
