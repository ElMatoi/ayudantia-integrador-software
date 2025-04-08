import axios from './axiosInstance';
import { User, CreateUserDto } from '../types/user';
import { apiResponse } from '../types/api';

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const response = await axios.post<User>('/user/createUser', data);
  return response.data;
};

export const getUser = async (rut: string): Promise<apiResponse<User>> => {
  const response = await axios.get<apiResponse<User>>(`/user/user/${rut}`);
  return response.data;
};

export const getUsers = async (): Promise<User[]>  => {
  const response = await axios.get<apiResponse<User[]>>('/user/all-users');
  return response.data.data
}