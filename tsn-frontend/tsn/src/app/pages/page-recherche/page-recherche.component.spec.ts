import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageRechercheComponent } from './page-recherche.component';

describe('PageRechercheComponent', () => {
  let component: PageRechercheComponent;
  let fixture: ComponentFixture<PageRechercheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageRechercheComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageRechercheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
