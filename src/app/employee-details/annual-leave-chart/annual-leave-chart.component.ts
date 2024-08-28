import { Component } from '@angular/core';
import {
  ChartOptions,
  ChartType,
  ChartData,
  Chart,
  registerables,
} from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

Chart.register(...registerables);

@Component({
  selector: 'app-annual-leave-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './annual-leave-chart.component.html',
  styleUrl: './annual-leave-chart.component.scss',
})
export class AnnualLeaveChartComponent {
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true,
      },
    },
  };

  public barChartLabels: string[] = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartData<'bar'> = {
    labels: this.barChartLabels,
    datasets: [
      {
        label: 'Annual Leave Taken',
        data: [3, 2, 1, 0, 2, 4, 3, 2, 1, 1, 0, 5],
        backgroundColor: '#ff5722',
      },
    ],
  };
}
