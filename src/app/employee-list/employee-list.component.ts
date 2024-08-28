import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { Employee } from '../interfaces/employee.interface';
import { tap, takeUntil, Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirma-dialog/confirma-dialog.component';
import { CustomMatPaginatorIntlService } from '../services/custom-mat-paginator-intl.service';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatCheckboxModule,
    MatDialogModule,
    CommonModule,
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntlService },
  ],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  employees: Employee[] = [];
  private _destroy$: Subject<void> = new Subject<void>();
  displayedColumns: string[] = [
    'select',
    'name',
    'email',
    'address',
    'phoneNo',
    'actions',
  ];
  employeesList = new MatTableDataSource<Employee>([]);
  privilegeType$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >('');
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  get isRowsSelected(): boolean {
    return this.employeesList.data.some((employee) => employee.selected);
  }
  constructor(
    private _employeeService: EmployeeService,
    private _router: Router,
    private _authService: AuthService,
    private _dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
    this.employeesList.paginator = this.paginator;
    this.privilegeType$ = this._authService.privilegeType$;
  }

  loadEmployees(): void {
    this._employeeService
      .getEmployees()
      .pipe(
        tap((data: Employee[]) => {
          this.employees = data;
          this.employeesList.data = data;
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  addEmployee(): void {
    const id: number = this.employeesList.data.length + 1;
    this._router.navigateByUrl(`/update-employee/${id}`);
  }

  deleteEmployee(id: number): void {
    const dialogRef = this._dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this._employeeService
          .deleteEmployee(id)
          .pipe(
            tap(() => {
              this.loadEmployees();
            }),
            takeUntil(this._destroy$)
          )
          .subscribe();
      }
    });
  }

  editEmployee(employee: Employee): void {
    if (employee) {
      this._router.navigateByUrl(`/update-employee/${employee.id}`);
    }
  }

  viewEmployee(id: string): void {
    this._router.navigateByUrl(`/employee-details/${id}`);
  }

  toggleAll(selectAll: boolean) {
    this.employeesList.data.forEach(
      (employee) => (employee.selected = selectAll)
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
