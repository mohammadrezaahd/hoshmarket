export interface ICheckNumberResponse {
  new_user: boolean;
}

export interface ISendOtpResponse {
  message: string;
  code: number;
}

export interface IVerifyOtpResponse {
  message: string;
  access_token: string;
  status: "existing_user";
}

export interface IRegisterResponse {
  message: string;
  access_token: string;
}

export interface ILoginWithPasswordResponse {
  message: string;
  access_token: string;
}

import type { IUserCredit } from "~/types/interfaces/profile.interface";

export interface ICurrentUserResponse {
  email: string;
  phone?: string;
  first_name?: string;
  last_name?: string;
  // optional subscription/credit info fetched separately
  subscription?: IUserCredit | null;
}
