import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { Rol } from './role.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { RolesService } from './roles.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { JwtRole } from 'src/auth/jwt/jwt-role';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';

@Controller('roles')
export class RolesController {

constructor(private RolesService: RolesService){}


@HasRoles( JwtRole.ADMIN)
@UseGuards(JwtAuthGuard, JwtRolesGuard)
@Post()
create(@Body () rol: CreateRolDto){
    return this.RolesService.create(rol);
}
}
