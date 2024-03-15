import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RolePermissionGuard } from './guards/role-permission-creator.guard';
import { BooksController } from './controllers/book.controller';
import { BookService } from './services/book.service';
import { RedisServiceClass } from './services/redis.service';
import { BookEntity } from './models/book.entity';
import { AuthModule } from 'src/auth/auth.module';
import { RedisRepository } from './infrastructure/redis/repository/redis.repository';
import { redisClientFactory } from './infrastructure/redis/redis.client.factory';
import { RedisModule } from './infrastructure/redis/redis.module';

@Module({
    imports: [AuthModule, TypeOrmModule.forFeature([BookEntity]), RedisModule],
    providers: [BookService, RolePermissionGuard, RedisRepository, redisClientFactory, RedisServiceClass],
    controllers: [BooksController],
  })
  export class BookModule {}
