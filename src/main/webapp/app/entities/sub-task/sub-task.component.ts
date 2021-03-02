import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISubTask } from 'app/shared/model/sub-task.model';
import { SubTaskService } from './sub-task.service';
import { SubTaskDeleteDialogComponent } from './sub-task-delete-dialog.component';

@Component({
  selector: 'jhi-sub-task',
  templateUrl: './sub-task.component.html',
})
export class SubTaskComponent implements OnInit, OnDestroy {
  subTasks?: ISubTask[];
  eventSubscriber?: Subscription;

  constructor(protected subTaskService: SubTaskService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.subTaskService.query().subscribe((res: HttpResponse<ISubTask[]>) => (this.subTasks = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSubTasks();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISubTask): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSubTasks(): void {
    this.eventSubscriber = this.eventManager.subscribe('subTaskListModification', () => this.loadAll());
  }

  delete(subTask: ISubTask): void {
    const modalRef = this.modalService.open(SubTaskDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.subTask = subTask;
  }
}
