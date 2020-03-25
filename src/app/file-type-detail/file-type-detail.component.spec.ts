import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTypeDetailComponent } from './file-type-detail.component';

describe('FileTypeDetailComponent', () => {
  let component: FileTypeDetailComponent;
  let fixture: ComponentFixture<FileTypeDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTypeDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTypeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
