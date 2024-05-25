import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfiledonsComponent } from './profiledons.component';

describe('ProfiledonsComponent', () => {
  let component: ProfiledonsComponent;
  let fixture: ComponentFixture<ProfiledonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProfiledonsComponent]
    });
    fixture = TestBed.createComponent(ProfiledonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
