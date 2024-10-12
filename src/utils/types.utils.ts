import { createClient } from 'redis';

export type RedisType = ReturnType<typeof createClient>;