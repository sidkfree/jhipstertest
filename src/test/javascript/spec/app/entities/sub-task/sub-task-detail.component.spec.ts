import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TestTestModule } from '../../../test.module';
import { SubTaskDetailComponent } from 'app/entities/sub-task/sub-task-detail.component';
import { SubTask } from 'app/shared/model/sub-task.model';

describe('Component Tests', () => {
  describe('SubTask Management Detail Component', () => {
    let comp: SubTaskDetailComponent;
    let fixture: ComponentFixture<SubTaskDetailComponent>;
    const route = ({ data: of({ subTask: new SubTask(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TestTestModule],
        declarations: [SubTaskDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SubTaskDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SubTaskDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load subTask on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.subTask).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
