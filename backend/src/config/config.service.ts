require("dotenv").config();

class ConfigService {
  constructor(private env: { [k: string]: string | undefined }) {}

  public getEnvValue<T = string>(
    key: (typeof enviromentVariables)[number],
    throwOnMissing = true,
  ): T {
    const value = process.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error - missing env.${key}`);
    }

    return (value ?? "") as unknown as T;
  }

  public ensureValues(keys: typeof enviromentVariables) {
    keys.forEach((k) => this.getEnvValue(k, true));
    return this;
  }
}

const enviromentVariables = [
  "DATABASE_TYPE",
  "DATABASE_HOST",
  "DATABASE_PORT",
  "DATABASE_USERNAME",
  "DATABASE_PASSWORD",
  "DATABASE_NAME",
 
]

export const { getEnvValue } = new ConfigService(process.env).ensureValues(
  enviromentVariables,
);