import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocModalComponent } from './create-doc-modal.component';

describe('CreateDocModalComponent', () => {
  let component: CreateDocModalComponent;
  let fixture: ComponentFixture<CreateDocModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDocModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDocModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
