import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemUploadFormComponent } from './item-upload-form.component';

describe('ItemUploadFormComponent', () => {
  let component: ItemUploadFormComponent;
  let fixture: ComponentFixture<ItemUploadFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemUploadFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemUploadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
