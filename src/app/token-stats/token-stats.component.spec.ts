import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenStatsComponent } from './token-stats.component';

describe('TokenStatsComponent', () => {
  let component: TokenStatsComponent;
  let fixture: ComponentFixture<TokenStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TokenStatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
