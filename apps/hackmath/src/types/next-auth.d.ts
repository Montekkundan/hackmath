
import  { type DefaultSession } from "next-auth";

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
}
    

export type ExtendedUser = DefaultSession["user"] & {
  id: number;
  role: UserRole;
  isTwoFactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}