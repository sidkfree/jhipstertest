import { ITransaction } from 'app/shared/model/transaction.model';
import { ISubTask } from 'app/shared/model/sub-task.model';
import { IJob } from 'app/shared/model/job.model';

export interface ITask {
  id?: number;
  title?: string;
  description?: string;
  transactions?: ITransaction[];
  idParent?: ISubTask;
  jobs?: IJob[];
}

export class Task implements ITask {
  constructor(
    public id?: number,
    public title?: string,
    public description?: string,
    public transactions?: ITransaction[],
    public idParent?: ISubTask,
    public jobs?: IJob[]
  ) {}
}
