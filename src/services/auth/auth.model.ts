/* eslint-disable no-unused-vars */
export interface ILoginPayload {
  tenantId?: number | null;
  usernameOrEmail: string;
  password: string;
  rememberClient?: boolean;
}

export interface IRegisterPayload {
  tenantId?: number | null;
  username: string;
  name: string;
  surname: string;
  emailAddress: string;
  password: string;
  fullName?: string;
  isCitizen?: boolean;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  dateOfBirth?: Date;
  thirdAccount?: any;
}

export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRegisterResponse {
  accessToken: string;
  refreshToken: string;
}

export interface IRefreshTokenResponse {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
}

export interface IUserInfo {
  tenantId: number;
  id: number;
  homeAddress: string;
  dateOfBirth: Date;
  gender: string;
  nationality: string;
  imageUrl?: string;
  username: string;
  emailAddress: string;
  name: string;
  surname: string;
  lockoutEndDateUtc: Date;
  accessFailedCount: number;
  isLockoutEnabled: number;
  phoneNumber: string;
  isPhoneNumberConfirmed: boolean;
  securityStamp: string;
  isTwoFactorEnabled: boolean;
  isEmailConfirmed: boolean;
  isActive: boolean;
  signInToken?: any;
  signInTokenExpireTimeUtc?: any;
  googleAuthenticatorKey?: any;
  thirdAccounts: any;
  isCitizen?: boolean;
  willBeDeletedDate?: Date;
  creationTime: Date;
  creatorUserId?: any;
  lastModificationTime: Date;
  lastModifierUserId?: any;
  permissions: any[];
  roles: any[];
}

export enum TenantState {
  Available = 1,
  NotFound = 3,
}

export interface IIsTenantAvailableResponse {
  adminPageConfig: string | null;
  mobileConfig: string | null;
  permissions: string | null;
  state: TenantState;
  tenantId: number | null;
}

export interface IAuthState {
  tenantId?: number;
  currentUser?: any;
  isAuth: boolean;
}

export type TAuthActionType = 'logout' | 'setIsAuth' | 'setCurrentUser';
