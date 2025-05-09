import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageReglagesComponent } from './page-reglages.component';

describe('PageReglagesComponent', () => {
  let component: PageReglagesComponent;
  let fixture: ComponentFixture<PageReglagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageReglagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageReglagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
