import { Component } from '@angular/core';
import {
  ChartOptions,
  ChartType,
  ChartData,
  registerables,
  Chart,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-performance-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './performance-chart.component.html',
  styleUrl: './performance-chart.component.scss',
})
export class PerformanceChartComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };

  public barChartLabels: string[] = ['Q1', 'Q2', 'Q3', 'Q4'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'This Year',
        data: [65, 59, 80, 81],
        backgroundColor: '#3f51b5',
      },
      {
        label: 'Last Year',
        data: [28, 48, 40, 19],
        backgroundColor: '#ff4081',
      },
    ],
  };
}
