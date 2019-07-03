import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyImpressionsChartComponent } from './daily-impressions-chart.component';

describe('DailyImpressionsChartComponent', () => {
  let component: DailyImpressionsChartComponent;
  let fixture: ComponentFixture<DailyImpressionsChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailyImpressionsChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailyImpressionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
