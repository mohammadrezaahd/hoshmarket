export interface INotifList {
  id: number;
  title: string;
  type: NotifyType;
  status: NotifStatus;
  created_at: string | Date;
}

export enum NotifyType {
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
  INFO = "INFO",
  WARNING = "WARNING",
}

export enum NotifStatus {
  READ = "READ",
  UNREAD = "UNREAD",
}
