import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTypeManagementComponent } from './file-type-management.component';

describe('FileTypeManagementComponent', () => {
  let component: FileTypeManagementComponent;
  let fixture: ComponentFixture<FileTypeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTypeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTypeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
