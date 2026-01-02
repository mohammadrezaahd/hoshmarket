export interface IUserProfile {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  // optional subscription info attached to profile responses
  subscription?: IUserCredit | null;
}

export interface IUserCredit {
  ai_model: number;
  email: string;
  ai_credit: number;
  subscription_plan: string;
  subscription_expiry?: string | Date;
  ai_model_title: string;
}
