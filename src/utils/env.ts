import dotenv from "dotenv";

dotenv.config();
interface Env {
  JWT_SECRET: string;
  PORT: number;
}

const env: Env = {
  JWT_SECRET: process.env.JWT_SECRET as string,
  PORT: process.env.PORT as unknown as number,
};

export default env;
