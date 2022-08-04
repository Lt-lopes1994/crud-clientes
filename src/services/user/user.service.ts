import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/controllers/user/usuario.entity';

@Injectable()
export class UserService {
  private users: Array<UserEntity> = [
    {
      id: 1,
      userName: 'admin',
      password: 'admin',
      email: 'admin@fakemail.com',
      fullName: 'Administrador',
      createdAt: new Date(),
    },
  ];

  public create(user: UserEntity): UserEntity {
    this.users.push(user);

    return user;
  }

  public searchByName(userName: string): UserEntity {
    return this.users.find((user) => user.userName === userName);
  }
}
