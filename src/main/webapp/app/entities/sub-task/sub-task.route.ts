import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISubTask, SubTask } from 'app/shared/model/sub-task.model';
import { SubTaskService } from './sub-task.service';
import { SubTaskComponent } from './sub-task.component';
import { SubTaskDetailComponent } from './sub-task-detail.component';
import { SubTaskUpdateComponent } from './sub-task-update.component';

@Injectable({ providedIn: 'root' })
export class SubTaskResolve implements Resolve<ISubTask> {
  constructor(private service: SubTaskService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISubTask> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((subTask: HttpResponse<SubTask>) => {
          if (subTask.body) {
            return of(subTask.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new SubTask());
  }
}

export const subTaskRoute: Routes = [
  {
    path: '',
    component: SubTaskComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testApp.subTask.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SubTaskDetailComponent,
    resolve: {
      subTask: SubTaskResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testApp.subTask.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SubTaskUpdateComponent,
    resolve: {
      subTask: SubTaskResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testApp.subTask.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SubTaskUpdateComponent,
    resolve: {
      subTask: SubTaskResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'testApp.subTask.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
