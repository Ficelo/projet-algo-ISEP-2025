import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageFeedComponent } from './page-feed.component';

describe('PageFeedComponent', () => {
  let component: PageFeedComponent;
  let fixture: ComponentFixture<PageFeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageFeedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
