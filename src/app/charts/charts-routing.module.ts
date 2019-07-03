import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DailyImpressionsChartComponent } from './daily-impressions-chart/daily-impressions-chart.component';

const routes: Routes = [{
  path: '',
  component: DailyImpressionsChartComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
