import { dbConnect } from "./database.ts";
import app from "./app.ts";

await dbConnect("./db/linkshorter").then(_ => console.log("Connected to database"));
Deno.serve({
  port: 8000, 
}, app.fetch)