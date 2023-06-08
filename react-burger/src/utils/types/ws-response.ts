export enum Status {
  created = "created",
  pending = "pending",
  done = "done",
}

export type TOrder = {
  ingredients: Array<string>;
  name: string;
  _id: string;
  status: Status;
  number: number;
  createdAt: Date;
  updatedAt: Date;
};
export type TWSResponseFeed = {
  success: boolean;
  orders: Array<TOrder>;
  total: number;
  totalToday: number;
};
