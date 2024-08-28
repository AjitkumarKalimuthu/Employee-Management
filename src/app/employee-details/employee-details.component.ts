import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmployeeService } from '../services/employee.service';
import { EmployeesPerformanceDetails } from '../interfaces/employee.interface';
import { tap, takeUntil, Subject } from 'rxjs';
import { PerformanceChartComponent } from './performance-chart/performance-chart.component';
import { AnnualLeaveChartComponent } from './annual-leave-chart/annual-leave-chart.component';

@Component({
  selector: 'app-employee-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    PerformanceChartComponent,
    AnnualLeaveChartComponent,
  ],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'name',
    'role',
    'score',
    'currentMonthScore',
    'lastMonthScore',
  ];
  employeesPerformanceDetails: EmployeesPerformanceDetails[] = [];
  showPerformanceChart: boolean = true;
  private _destroy$: Subject<void> = new Subject<void>();
  constructor(private _employeeService: EmployeeService) {}
  ngOnInit(): void {
    this.loadEmployeesPerformanceDetails();
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  loadEmployeesPerformanceDetails(): void {
    this._employeeService
      .getEmployeesPerformanceDetails()
      .pipe(
        tap((data: EmployeesPerformanceDetails[]) => {
          this.employeesPerformanceDetails = data;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }
}
