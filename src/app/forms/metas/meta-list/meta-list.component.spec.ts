import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaListComponent } from './meta-list.component';

describe('MetaListComponent', () => {
  let component: MetaListComponent;
  let fixture: ComponentFixture<MetaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetaListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
