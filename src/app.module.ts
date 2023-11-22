import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './auth/jwt/jwt.constants';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Guatemala2021**',
      database: 'ecommerce_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    UsersModule,
    AuthModule,
    RolesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
