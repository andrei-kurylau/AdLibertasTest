import { Injectable } from '@angular/core';
import { ChartData } from '../models/chart-data';
import { SharedModule } from '../shared.module';

declare var require: any;

@Injectable({
  providedIn: SharedModule
})
export class BackendService {

  constructor() { }

  public getChart(): Promise<ChartData> {
    return new Promise((resolve) => {
      resolve(require('../../../assets/1.json').impressionsCpmChart);
    });
  }
}
