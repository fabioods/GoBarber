declare global {
  namespace NodeJS {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    interface ProcessEnv {
      SECRET: string;
      NODE_ENV: 'development' | 'production';
      APP_WEB_URL: string;
      APP_API_URL: string;
    }
  }
}

export {};
