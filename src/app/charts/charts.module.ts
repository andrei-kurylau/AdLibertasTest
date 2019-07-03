import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsRoutingModule } from './charts-routing.module';
import { DailyImpressionsChartComponent } from './daily-impressions-chart/daily-impressions-chart.component';

@NgModule({
  declarations: [DailyImpressionsChartComponent],
  imports: [
    CommonModule,
    ChartsRoutingModule
  ]
})
export class ChartsModule { }
