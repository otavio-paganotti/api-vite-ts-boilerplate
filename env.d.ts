interface ImportMetaEnv {
  readonly VITE_APP_PORT: number;
  readonly VITE_API_VERSION: number;
  readonly VITE_JWT_SECRET: string;
  readonly VITE_REDIS_CONNECTION: 'local';
  readonly VITE_REDIS_HOST: string;
  readonly VITE_REDIS_PORT: number;
  readonly VITE_REDIS_PASSWORD: string;
  readonly VITE_MONGO_INITDB_HOST: string;
  readonly VITE_MONGO_INITDB_PORT: number;
  readonly VITE_MONGO_INITDB_DATABASE: string;
  readonly VITE_MONGO_INITDB_USERNAME: string;
  readonly VITE_MONGO_INITDB_PASSWORD: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
