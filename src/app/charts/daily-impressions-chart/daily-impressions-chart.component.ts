import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BackendService } from 'src/app/shared/services/backend.service';
import { ChartData, ChartDateRange } from 'src/app/shared/models/chart-data';
import * as Chart from 'chart.js';

const DATE_RANGES = [
  {
    value: 1,
    label: '7D'
  },
  {
    value: 2,
    label: '14D'
  },
  {
    value: 3,
    label: 'This Month'
  },
  {
    value: 4,
    label: 'Last Month'
  },
  {
    value: 5,
    label: 'Year to Date'
  },
  {
    value: 6,
    label: 'Custom'
  }
];

@Component({
  selector: 'app-daily-impressions-chart',
  templateUrl: './daily-impressions-chart.component.html',
  styleUrls: ['./daily-impressions-chart.component.scss']
})
export class DailyImpressionsChartComponent implements OnInit {
  @ViewChild('chartCanvas', { static: false }) chartCanvas: ElementRef;

  public selectedDateRange: ChartDateRange;
  public appliedDateRange: ChartDateRange;

  private _chartData: ChartData;
  private _chart: Chart;

  public get dateRanges(): ChartDateRange[] {
    return DATE_RANGES;
  }

  constructor(private _backend: BackendService) { }

  ngOnInit() {
    this.selectedDateRange = this.appliedDateRange = DATE_RANGES[0];
    this.getData();
  }

  public get isSubmitButtonVisible(): boolean {
    return this.selectedDateRange.value !== this.appliedDateRange.value;
  }

  private getData(): void {
    this._backend.getChart()
      .then((data) => {
        this._chartData = data;
        this.drawChart();
      });
  }

  private drawChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this._chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this._chartData.labels,
        datasets: [
          {
            type: 'line',
            label: this._chartData.series[0],
            data: this._chartData.data[0],
            yAxisID: 'right',
            backgroundColor: 'transparent',
            borderColor: '#97BBCD',
            pointBackgroundColor: '#97BBCD'
          },
          {
            label: this._chartData.series[1],
            data: this._chartData.data[1],
            yAxisID: 'left',
            backgroundColor: '#F4F4F4',
            borderColor: '#DCDCDC',
            borderWidth: 2
          }
        ]
      },
      options: {
        title: {
          display: true,
          position: 'top',
          text: 'daily impressions and CPM'
        },
        legend: {
          position: 'bottom'
        },
        responsive: false,
        scales: {
          xAxes: [{
            gridLines: {
              drawOnChartArea: false
            }
          }],
          yAxes: [{
            id: 'left',
            type: 'linear',
            position: 'left',
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              max: 3000000,
              min: 0,
              callback: (label) => {
                return label / 1000000;
              }
            },
            scaleLabel: {
              display: true,
              labelString: 'Millions',
              fontSize: 14,
              lineHeight: 2
            }
          }, {
            id: 'right',
            type: 'linear',
            position: 'right',
            gridLines: {
              drawOnChartArea: false
            },
            ticks: {
              max: 0.5,
              min: 0,
              callback: (label) => {
                return `$${label}`;
              }
            }
          }]
        }
      }
    });
  }

  public onDateRangeChange(value: ChartDateRange): void {
    this.selectedDateRange = value;
  }

  public onDateRangeSubmit(): void {
    this.appliedDateRange = this.selectedDateRange; 
    this.getData();
  }

}
