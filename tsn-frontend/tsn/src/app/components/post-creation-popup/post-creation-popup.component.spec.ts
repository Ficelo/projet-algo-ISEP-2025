import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCreationPopupComponent } from './post-creation-popup.component';

describe('PostCreationPopupComponent', () => {
  let component: PostCreationPopupComponent;
  let fixture: ComponentFixture<PostCreationPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostCreationPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostCreationPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
