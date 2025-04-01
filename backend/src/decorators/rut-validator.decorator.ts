import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  import { validateRut } from 'rutlib';
  
  export function IsRut(validationOptions?: ValidationOptions) {
    return function (object: Record<string, any>, propertyName: string) {
      registerDecorator({
        name: 'isRut',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (typeof value !== 'string') return false;
            return validateRut(value);
          },
          defaultMessage(args: ValidationArguments) {
            return 'Rut inválido.';
          },
        },
      });
    };
  }