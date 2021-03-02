import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ISubTask } from 'app/shared/model/sub-task.model';

@Component({
  selector: 'jhi-sub-task-detail',
  templateUrl: './sub-task-detail.component.html',
})
export class SubTaskDetailComponent implements OnInit {
  subTask: ISubTask | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subTask }) => (this.subTask = subTask));
  }

  previousState(): void {
    window.history.back();
  }
}
