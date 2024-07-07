// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    BASE_URL: string
    REDIS_URL: string
    REDIS_PORT: number
    REDIS_PWD: string
  }
}
