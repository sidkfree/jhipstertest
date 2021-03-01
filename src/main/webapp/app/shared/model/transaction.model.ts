import { Moment } from 'moment';
import { ITask } from 'app/shared/model/task.model';

export interface ITransaction {
  id?: number;
  amount?: number;
  date?: Moment;
  relatedTransaction?: ITask;
}

export class Transaction implements ITransaction {
  constructor(public id?: number, public amount?: number, public date?: Moment, public relatedTransaction?: ITask) {}
}
