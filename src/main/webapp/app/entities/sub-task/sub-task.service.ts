import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubTask } from 'app/shared/model/sub-task.model';

type EntityResponseType = HttpResponse<ISubTask>;
type EntityArrayResponseType = HttpResponse<ISubTask[]>;

@Injectable({ providedIn: 'root' })
export class SubTaskService {
  public resourceUrl = SERVER_API_URL + 'api/sub-tasks';

  constructor(protected http: HttpClient) {}

  create(subTask: ISubTask): Observable<EntityResponseType> {
    return this.http.post<ISubTask>(this.resourceUrl, subTask, { observe: 'response' });
  }

  update(subTask: ISubTask): Observable<EntityResponseType> {
    return this.http.put<ISubTask>(this.resourceUrl, subTask, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<ISubTask>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<ISubTask[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
