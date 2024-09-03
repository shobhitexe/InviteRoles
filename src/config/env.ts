import * as dotenv from "dotenv";

dotenv.config();

function env() {
  const TOKEN: string = process.env.TOKEN || "";
  const STATUS: string = process.env.STATUS || "";
  const ROLE_ID: string = process.env.ROLE_ID || "";
  return { TOKEN, STATUS, ROLE_ID };
}

export { env };
