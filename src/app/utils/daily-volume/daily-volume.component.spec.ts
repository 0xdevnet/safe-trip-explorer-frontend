import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyVolumeComponent } from './daily-volume.component';

describe('DailyVolumeComponent', () => {
  let component: DailyVolumeComponent;
  let fixture: ComponentFixture<DailyVolumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DailyVolumeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyVolumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
