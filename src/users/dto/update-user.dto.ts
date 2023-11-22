import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {

@IsNotEmpty()
@IsString()
@IsOptional()
name?: String;

@IsNotEmpty()
@IsString()
@IsOptional()
lastname?: String;

@IsNotEmpty()
@IsString()
@IsOptional()
phone?: String; 

@IsOptional()
imagen?: String;

@IsOptional()
notification_token?: String;
}