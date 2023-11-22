import { Body, Controller,  Post,Get, UseGuards, Put, Param, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtRolesGuard } from 'src/auth/jwt/jwt-roles.guard';
import { HasRoles } from 'src/auth/jwt/has-roles';
import { JwtRole } from 'src/auth/jwt/jwt-role';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){

    }

    //Get -> obtener datos
    //Post -> crear
    //put-patch -> actualizar
    //delete -> borrar

    @HasRoles(JwtRole.ADMIN, JwtRole.CLIENT)//solamente puedem acceder los que sean admin
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Get() //ruta -> http://192.168.0.106:3000/users --> get
    findAll(){
        return this.usersService.findAll();
    }

    
    @Post() //ruta -> http://192.168.0.106:3000/users --> post
    create(@Body() user:CreateUserDto){
     return this.usersService.create(user);
    }

    @HasRoles( JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard, JwtRolesGuard)
    @Put(':id') //ruta -> http://192.168.0.106:3000/users/:id --> post
    update(@Param('id', ParseIntPipe)id: number, @Body()user: UpdateUserDto){
     return this.usersService.update(id,user);
    }

    
    @HasRoles( JwtRole.CLIENT)
    @UseGuards(JwtAuthGuard,JwtRolesGuard)
    @Post('upload/:id')
    @UseInterceptors(FileInterceptor('file'))
    updateWithImage(
        @UploadedFile( new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
              new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }), //archivos validos 
            ],
          }),) file: Express.Multer.File,
          @Param('id', ParseIntPipe)id: number,
          @Body()user: UpdateUserDto
        ) {
  
        return this.usersService.updateWithImage(file,id,user);
    }

}
