import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubTask } from 'app/shared/model/sub-task.model';
import { SubTaskService } from './sub-task.service';

@Component({
  templateUrl: './sub-task-delete-dialog.component.html',
})
export class SubTaskDeleteDialogComponent {
  subTask?: ISubTask;

  constructor(protected subTaskService: SubTaskService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.subTaskService.delete(id).subscribe(() => {
      this.eventManager.broadcast('subTaskListModification');
      this.activeModal.close();
    });
  }
}
