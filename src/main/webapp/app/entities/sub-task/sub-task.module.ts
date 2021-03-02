import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TestSharedModule } from 'app/shared/shared.module';
import { SubTaskComponent } from './sub-task.component';
import { SubTaskDetailComponent } from './sub-task-detail.component';
import { SubTaskUpdateComponent } from './sub-task-update.component';
import { SubTaskDeleteDialogComponent } from './sub-task-delete-dialog.component';
import { subTaskRoute } from './sub-task.route';

@NgModule({
  imports: [TestSharedModule, RouterModule.forChild(subTaskRoute)],
  declarations: [SubTaskComponent, SubTaskDetailComponent, SubTaskUpdateComponent, SubTaskDeleteDialogComponent],
  entryComponents: [SubTaskDeleteDialogComponent],
})
export class TestSubTaskModule {}
