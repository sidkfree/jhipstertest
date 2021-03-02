import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { ISubTask, SubTask } from 'app/shared/model/sub-task.model';
import { SubTaskService } from './sub-task.service';

@Component({
  selector: 'jhi-sub-task-update',
  templateUrl: './sub-task-update.component.html',
})
export class SubTaskUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    title: [],
    description: [],
  });

  constructor(protected subTaskService: SubTaskService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ subTask }) => {
      this.updateForm(subTask);
    });
  }

  updateForm(subTask: ISubTask): void {
    this.editForm.patchValue({
      id: subTask.id,
      title: subTask.title,
      description: subTask.description,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const subTask = this.createFromForm();
    if (subTask.id !== undefined) {
      this.subscribeToSaveResponse(this.subTaskService.update(subTask));
    } else {
      this.subscribeToSaveResponse(this.subTaskService.create(subTask));
    }
  }

  private createFromForm(): ISubTask {
    return {
      ...new SubTask(),
      id: this.editForm.get(['id'])!.value,
      title: this.editForm.get(['title'])!.value,
      description: this.editForm.get(['description'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISubTask>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
