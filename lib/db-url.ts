type DatabaseEnv = Record<string, string | undefined> & {
  DB_HOST?: string;
  DB_PORT?: string;
  DB_NAME?: string;
  DB_USER?: string;
  DB_PASSWORD?: string;
  DATABASE_URL?: string;
};

function encode(value: string) {
  return encodeURIComponent(value);
}

export function getDatabaseUrl(env: DatabaseEnv = process.env) {
  if (env.DATABASE_URL) {
    return env.DATABASE_URL;
  }

  const host = env.DB_HOST;
  const port = env.DB_PORT;
  const name = env.DB_NAME;
  const user = env.DB_USER;
  const password = env.DB_PASSWORD;

  if (!host || !port || !name || !user || !password) {
    throw new Error("Database environment variables are not fully set");
  }

  return `mysql://${encode(user)}:${encode(password)}@${host}:${port}/${name}`;
}
