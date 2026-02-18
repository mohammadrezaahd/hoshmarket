import type { IPostProduct } from "../dtos/product.dto";
import type { TemplateSource } from "../dtos/templates.dto";

export interface IProductList {
  id: number;
  title: string;
  category_id: number;
  user_status: ProductStatus;
  user_status_text: string;
  source: TemplateSource;
}

export interface IGetProduct extends IPostProduct {
  id: number;
  user_status: ProductStatus;
  user_status_text: string;
}

export enum ProductStatus {
  NOT_COMPLETE = 0,
  PENDING = 1,
  WAITING_FOR_APPROVAL = 2,
  QUEUED = 3,
  PROCESSING = 4,
  COMPLETED = 5,
}

export enum SubProductStatus {
  PUBLISHED = "publish",
  UNPUBLISHED = "not_publish",
}

export interface ISubProducts {
  id: number;
  category_id: number;
  title: string;
  brand: string;
  images: number[];
  source: TemplateSource;
  status: SubProductStatus;
  active: boolean;
}
