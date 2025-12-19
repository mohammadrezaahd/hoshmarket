export interface IPostTransfer {
  source: TransferSource;
  urls: string[];
}

export enum TransferSource {
  AMAZON = "amazon",
  TOROB = "torob",
  DIGIKALA = "digikala",
  BAZAR = "bazar",
  SHEYPUR = "sheypoor",
  OTHER = "other",
}
