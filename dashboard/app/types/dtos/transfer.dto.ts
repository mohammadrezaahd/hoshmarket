export interface IPostTransfer {
  source: TransferSource;
  urls: string[];
  category_id?:number
}

export enum TransferSource {
  AMAZON = "amazon",
  TOROB = "torob",
  DIGIKALA = "digikala",
  BAZAR = "bazar",
  SHEYPUR = "sheypoor",
  OTHER = "other",
}
