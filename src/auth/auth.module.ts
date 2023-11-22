import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './jwt.constants';
import { JwtStrategy } from './jwt.strategy';
import { RolesController } from '../roles/roles.controller';
import { RolesService } from 'src/roles/roles.service';
import { Rol } from 'src/roles/role.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([User, Rol]),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '6h' },// es el timepo en que esta validado el codigo
    }),
  ],
  providers: [AuthService, RolesService, JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
