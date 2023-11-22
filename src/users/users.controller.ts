import { Body, Controller,  Post,Get, UseGuards, Put, Param, ParseIntPipe, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService){

    }

    //Get -> obtener datos
    //Post -> crear
    //put-patch -> actualizar
    //delete -> borrar

    @UseGuards(JwtAuthGuard)
    @Get() //ruta -> http://192.168.0.106:3000/users --> get
    findAll(){
        return this.usersService.findAll();
    }

    
    @Post() //ruta -> http://192.168.0.106:3000/users --> post
    create(@Body() user:CreateUserDto){
     return this.usersService.create(user);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id') //ruta -> http://192.168.0.106:3000/users/:id --> post
    update(@Param('id', ParseIntPipe)id: number, @Body()user: UpdateUserDto){
     return this.usersService.update(id,user);
    }

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
