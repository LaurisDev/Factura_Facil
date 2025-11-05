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
import { FacturasModule } from './facturas/facturas.module';
import { ProduccionModule } from './produccion/produccion.module';
import { DocumentosModule } from './documentos/documentos.module';
import { Factura } from './facturas/entities/factura.entity';
import { Documento } from './documentos/entities/documento.entity'; // ✅ importa tu entidad
import { Produccion } from './produccion/entities/produccion.entity';

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
          type: 'postgres',
          host: cfg.get<string>('DB_HOST'),
          port: Number(cfg.get('DB_PORT') || 5432),
          username: cfg.get<string>('DB_USER'),
          password: cfg.get<string>('DB_PASS'),
          database: cfg.get<string>('DB_NAME'),
          entities: [User, Factura, Documento, Produccion], // ✅ agrega Documento aquí
          synchronize: true, // solo en desarrollo
          ssl: cfg.get<string>('DB_SSL') === 'true' ? { rejectUnauthorized: false } : undefined,
          logging: true,
          uuidExtension: 'pgcrypto',
          autoLoadEntities: true, 
        };
      },
    }),

    UsersModule,
    AuthModule,
    FacturasModule,
    ProduccionModule,
    DocumentosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
