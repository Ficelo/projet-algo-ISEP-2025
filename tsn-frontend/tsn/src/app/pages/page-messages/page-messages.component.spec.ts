import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageMessagesComponent } from './page-messages.component';

describe('PageMessagesComponent', () => {
  let component: PageMessagesComponent;
  let fixture: ComponentFixture<PageMessagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageMessagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
