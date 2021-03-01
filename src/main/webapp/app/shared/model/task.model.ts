import { ITransaction } from 'app/shared/model/transaction.model';
import { IJob } from 'app/shared/model/job.model';

export interface ITask {
  id?: number;
  title?: string;
  description?: string;
  transactions?: ITransaction[];
  jobs?: IJob[];
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public transactions?: ITransaction[],
    public jobs?: IJob[]
  ) {}
}
