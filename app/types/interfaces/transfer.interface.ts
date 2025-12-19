import type { TransferSource } from "../dtos/transfer.dto";

export interface ITransferList {
  id: number;
  user_id: number;
  source_name: TransferSource;
  title: string;
  brand?: string;
  main_image: string;
  status: TransferStatus;
  progress: number;
  created_at: Date | string;
  updated_at: Date | string;
}

export enum TransferStatus {
  RAW = "raw",
  FETCHED = "data_fetched",
  ERROR = "error_fetching_data",
  NOT_FOUND = "asin_not_found",
}
