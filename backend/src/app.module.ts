// backend/src/app.module.ts
import * as path from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [path.resolve(process.cwd(), '.env')],
    }),

    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => {
        return {
          type: 'mysql',
          host: cfg.get<string>('DB_HOST'),
          port: Number(cfg.get('DB_PORT') || 3306),
          username: cfg.get<string>('DB_USER'),
          password: cfg.get<string>('DB_PASS'),
          database: cfg.get<string>('DB_NAME'),
          entities: [User],
          synchronize: true, // SOLO en desarrollo
          ssl: cfg.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : undefined,
          logging: true,
        };
      },
    }),

    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
