import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileTypeUpdateComponent } from './file-type-update.component';

describe('FileTypeUpdateComponent', () => {
  let component: FileTypeUpdateComponent;
  let fixture: ComponentFixture<FileTypeUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileTypeUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileTypeUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
