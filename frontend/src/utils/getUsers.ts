import { User } from '@/types/user';

export const getUsers = async (): Promise<User[]> => {
  const response = await fetch('https://reqres.in/api/users?page=1');
  const data = await response.json();
  return data.data;
};
