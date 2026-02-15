export interface IDigikalaAuth {
  logo: IDigikalaAuthLogo;
  seller_name: string;
  seller_id: number;
}

export interface IDigikalaAuthLogo {
  file?: string;
  status: string;
  rejection_reason?: string;
}

export interface IDigikalaAuthInfo {
  //   logo: IDigikalaAuthLogo;
  seller_name: string;
  seller_id: number;
}
