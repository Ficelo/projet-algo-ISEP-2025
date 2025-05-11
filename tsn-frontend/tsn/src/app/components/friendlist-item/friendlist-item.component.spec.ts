import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FriendlistItemComponent } from './friendlist-item.component';

describe('FriendlistItemComponent', () => {
  let component: FriendlistItemComponent;
  let fixture: ComponentFixture<FriendlistItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FriendlistItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FriendlistItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
