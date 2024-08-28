import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnualLeaveChartComponent } from './annual-leave-chart.component';

describe('AnnualLeaveChartComponent', () => {
  let component: AnnualLeaveChartComponent;
  let fixture: ComponentFixture<AnnualLeaveChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnualLeaveChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnnualLeaveChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
