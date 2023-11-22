import { Body, Controller, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare } from 'bcrypt';
import { Repository } from 'typeorm';
import { Rol } from './role.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {

constructor(private RolesService: RolesService){}

@Post()
create(@Body () rol: CreateRolDto){
    return this.RolesService.create(rol);
}
}
