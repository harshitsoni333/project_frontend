import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTypeFormComponent } from './file-type-form.component';

describe('FileTypeFormComponent', () => {
  let component: FileTypeFormComponent;
  let fixture: ComponentFixture<FileTypeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTypeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTypeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
