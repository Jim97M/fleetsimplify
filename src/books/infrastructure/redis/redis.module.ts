import { Module } from '@nestjs/common';
import {Redis} from 'ioredis'; 
import { RedisServiceClass } from 'src/books/services/redis.service';
import { redisClientFactory } from './redis.client.factory';
import { RedisRepository } from './repository/redis.repository';

@Module({
  providers: [
    RedisServiceClass,
    redisClientFactory,
    RedisRepository,
    {
      provide: 'Redis',
      useValue: new Redis(), 
    },
  ],
  exports: ['Redis', RedisServiceClass], 
})
export class RedisModule {}
