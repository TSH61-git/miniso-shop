export interface UserRead {
  userId: number;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
}