declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SECRET: string;
      NODE_ENV: 'development' | 'production';
      REDIS_HOST: string;
      REDIS_PORT: number;
      REDIS_PASS: string;
    }
  }
}

export {};
