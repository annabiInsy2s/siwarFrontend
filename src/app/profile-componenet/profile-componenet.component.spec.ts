import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponenetComponent } from './profile-componenet.component';

describe('ProfileComponenetComponent', () => {
  let component: ProfileComponenetComponent;
  let fixture: ComponentFixture<ProfileComponenetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileComponenetComponent]
    });
    fixture = TestBed.createComponent(ProfileComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
