import { IsNotEmpty, IsString, IsEmail, MinLength } from "class-validator";

export class RegisterAuthDto{
    
    @IsNotEmpty() //que no esa un campo vacio
    @IsString()   //se asegura que lo que recibe si sea un string
    name: string;

    @IsNotEmpty() //que no esa un campo vacio
    @IsString()
    lastname: string;

    @IsNotEmpty() //que no esa un campo vacio
    @IsString()
    @IsEmail({},{message: 'El correo electronico no es valido'})
    email: string;

    @IsNotEmpty() //que no esa un campo vacio
    @IsString()
    phone: string;

    @IsNotEmpty() //que no esa un campo vacio
    @IsString()
    @MinLength(6,{ message: 'La contraseña debe tener minimo 6 caracteres'})
    password: string;
    

    rolesIds: string[];

    }