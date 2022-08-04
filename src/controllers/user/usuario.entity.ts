/* eslint-disable prettier/prettier */
import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUserAlreadyExist } from 'src/validator/isNomeUsuarioUnico';

/* eslint-disable prettier/prettier */
export class UserEntity {
  id: number;

  @IsUserAlreadyExist({
    message: 'Nome de usuário já existe',
  })
  @IsNotEmpty({
    message: 'O campo nome de usuário é obrigatório',
  })
  @IsString({
    message: 'O nome de usuario deve conter apenas letras',
  })
  userName: string;

  @IsEmail({}, {
    message: 'O email informado é inválido',
  })
  email: string;

  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'O campo senha é obrigatório',
  })
  password: string;

  @IsNotEmpty({
    message: 'O nome completo é obrigatório',
  })
  fullName: string;
  createdAt: Date;
}