import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
  } from 'class-validator';
  
  export function IsPassword(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isPassword',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            if (typeof value !== 'string') return false;
  
            const uppercaseRegex = /[A-ZÁÉÍÓÚÜÀÈÌÒÙÂÊÎÔÛÃÕÇ]/;
            const lowercaseRegex = /[a-záéíóúüàèìòùâêîôûãõç]/;
            const numberRegex = /[0-9]/;
            const symbolRegex = /[!?@#$%^&*.,_-]/;
  
            
  
            return (
              value.length >= 8 &&
              value.length <= 35 &&
              uppercaseRegex.test(value) &&
              lowercaseRegex.test(value) &&
              numberRegex.test(value) &&
              symbolRegex.test(value)
            );
          },
          defaultMessage(args: ValidationArguments) {
            return `Contraseña inválida.`;
          },
        },
      });
    };
  }