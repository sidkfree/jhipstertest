import { ITask } from 'app/shared/model/task.model';

export interface ISubTask {
  id?: number;
  title?: string;
  description?: string;
  tasks?: ITask[];
}

export class SubTask implements ISubTask {
  constructor(public id?: number, public title?: string, public description?: string, public tasks?: ITask[]) {}
}
