import { HttpException,HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { In, Repository } from 'typeorm';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import {compare} from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Rol } from 'src/roles/role.entity';

@Injectable()
export class AuthService {

constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Rol) private rolesRepository: Repository<Rol>,

    private jwtService: JwtService

){}

async register(user: RegisterAuthDto) {
    
    const {email,phone} = user
    const emailExist = await this.usersRepository.findOneBy({email: email });
    
    if (emailExist){
        return new HttpException('El email ya esta registrado', HttpStatus.CONFLICT)
    }

    const phoneExist = await this.usersRepository.findOneBy({phone:phone})
    if (phoneExist){
        return new HttpException('El telefono ya esta registrado',HttpStatus.CONFLICT)
    }
    
    
    const newUser = this.usersRepository.create(user);
    const rolesIds = user.rolesIds;
    const roles = await this.rolesRepository.findBy({id: In(rolesIds) });
    newUser.roles = roles;


    const userSaved = await  this.usersRepository.save(newUser);

    const payload = {id: userSaved.id, name: userSaved.name};
    const token = this.jwtService.sign(payload);
    const data ={
        user:userSaved,
        token:'Bearer ' + token
    }

    delete data.user.password 

    return data;

}

async login(loginData: LoginAuthDto){

    const {email, password} = loginData
    const userfound = await this.usersRepository.findOne({
        where: { email: email},
        relations: ['roles']
    })
    
    //este if es para verificar si si o no existe
    if (!userfound){
        return   new HttpException('El email no existe', HttpStatus.NOT_FOUND );// el 404 se usa para datos no econtrados 
   
    }

    const isPasswordValid = await compare(password, userfound.password);

    // es para validar y compara la contraseña
    if (!isPasswordValid){
         return new HttpException('La contraseña es incorrecta',HttpStatus.FORBIDDEN); // error 403 es sobre acceso negado
   
    }

    const rolesIds = userfound.roles.map(rol=> rol.id);



    const payload = {id: userfound.id,
         name: userfound.name,
          roles: rolesIds};
    const token = this.jwtService.sign(payload);
    const data ={
        user:userfound,
        token:'Bearer ' + token
    }

    delete data.user.password //eliminamos el password para que el cliente no reciba esa informacion 
    return data; // si pasa por todas las validaciones retorna los datos de usuario 
}
}
