/* eslint-disable @typescript-eslint/no-unused-vars *//* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { UserService } from 'src/services/user/user.service';

@Injectable()
@ValidatorConstraint()
export class IsUserNameUniqueConstraint implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}
 
  validate(userName: string, validationArguments?: ValidationArguments): boolean | Promise<boolean> {
    return !!!this.userService.searchByName(userName);
  }
}

export function IsUserAlreadyExist(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUserNameUniqueConstraint,
    });
  };
}