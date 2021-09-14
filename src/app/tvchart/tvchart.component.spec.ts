import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TVchartComponent } from './tvchart.component';

describe('TVchartComponent', () => {
  let component: TVchartComponent;
  let fixture: ComponentFixture<TVchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TVchartComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TVchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
