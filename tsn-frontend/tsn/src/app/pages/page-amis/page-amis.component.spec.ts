import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageAmisComponent } from './page-amis.component';

describe('PageAmisComponent', () => {
  let component: PageAmisComponent;
  let fixture: ComponentFixture<PageAmisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageAmisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageAmisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
