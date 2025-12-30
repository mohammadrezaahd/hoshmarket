export interface IQueueList {
  id: number;
  job_name: string;
  status: QueueStatus;
  progress: number;
  short_message: string;
  created_at: Date | string;
}

export enum QueueStatus {
  PENDING = "PENDING",
  STARTED = "STARTED",
  PROGRESS = "PROGRESS",
  SUCCESS = "SUCCESS",
  FAILED = "FAILED",
  RETRY = "RETRY",
  CANCELED = "CANCELED",
}
