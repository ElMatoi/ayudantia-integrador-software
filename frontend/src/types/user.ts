export interface User {
    id: string;
    name: string;
    rut: string;
}

export interface CreateUserDto {
    name: string;
    rut: string;
  }