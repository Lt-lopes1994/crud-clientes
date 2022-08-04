import {
  Body,
  Controller,
  Get,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { NestResponse } from 'src/core/http/nest-response';
import { NestResponseBuilder } from 'src/core/http/nest-response-builder';
import { UserService } from 'src/services/user/user.service';
import { UserEntity } from './usuario.entity';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get(':userName')
  public searchByName(@Param('userName') userName: string) {
    const foundUser = this.userService.searchByName(userName);

    if (!foundUser) {
      throw new NotFoundException({
        statusCode: HttpStatus.NOT_FOUND,
        message: `Usuário ${userName} não encontrado`,
      });
    }

    return foundUser;
  }

  @Post()
  public create(@Body() user: UserEntity): NestResponse {
    const createdUser = this.userService.create(user);
    return new NestResponseBuilder()
      .comStatus(HttpStatus.CREATED)
      .comHeader({
        Location: `/users/${createdUser.userName}`,
      })
      .comBody(createdUser)
      .build();
  }
}
