import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Get('getListOfUser')
    async getUser(){
        return this.userService.getUsers()
    }

    @Post('createUser')
    async createUser(@Body() dto: CreateUserDto ){
        return this.userService.createUser(dto)
    }
}
