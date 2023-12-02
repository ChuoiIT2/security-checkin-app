/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NOAUTH_API_ENDPOINT: string;
  readonly VITE_AUTH_API_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
