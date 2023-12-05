/* eslint-disable no-unused-vars */
export enum ERole {
  Admin = 1,
  User = 2,
}

export type TUserDto = {
  id: number;
  name: string;
  username?: string;
  email: string;
  phoneNumber?: string;
  imageUrl?: string;
  gender?: string;
  dateOfBirth?: Date | string;
  role: ERole;
};

export type TLoginDto = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

export type TLoginResult = {
  accessToken: string;
  refreshToken: string;
  user: TUserDto;
};

export type TRefreshTokenDto = {
  refreshToken: string;
};

export type TRefreshTokenResult = {
  accessToken: string;
};

export type TAuthState = {
  currentUser: TUserDto | null;
  isAuth: boolean;
};

export type TAuthActionType = 'logout' | 'setIsAuth' | 'setCurrentUser';
