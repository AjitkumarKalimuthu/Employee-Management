import { Component } from '@angular/core';
import { Subject, tap, takeUntil } from 'rxjs';
import { Employee } from '../interfaces/employee.interface';
import { EmployeeService } from '../services/employee.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-or-edit-employee',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './add-or-edit-employee.component.html',
  styleUrl: './add-or-edit-employee.component.scss',
})
export class AddOrEditEmployeeComponent {
  employeeFormGroup!: FormGroup;
  private _destroy$: Subject<void> = new Subject<void>();
  id!: number;
  isAddEmployee: boolean = true;
  constructor(
    private employeeService: EmployeeService,
    private _router: Router,
    private _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.employeeFormGroup = this._fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNo: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.id = Number(this._router.url.split('/').pop() as string);
    this.getEmployeeById(this.id);
  }

  get employee(): Employee {
    return { ...this.employeeFormGroup.value, id: this.id.toString() };
  }

  addOrUpdateEmployee(): void {
    if (this.employeeFormGroup.valid) {
      if (this.isAddEmployee) {
        this.addEmployee();
      } else {
        this.updateEmployee();
      }
    }
  }

  addEmployee(): void {
    this.employeeService
      .addEmployee(this.employee)
      .pipe(
        tap(() => {
          this.navigateToEmployeeList();
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }

  updateEmployee(): void {
    if (this.employee) {
      this.employeeService
        .updateEmployee(this.employee.id, this.employee)
        .pipe(
          tap(() => {
            this.navigateToEmployeeList();
          }),
          takeUntil(this._destroy$)
        )
        .subscribe();
    }
  }

  navigateToEmployeeList(): void {
    this._router.navigateByUrl('/employee-list');
  }

  getEmployeeById(id: number): void {
    this.employeeService
      .getEmployeeById(id)
      .pipe(
        tap((resp: Employee) => {
          if (resp) {
            this.employeeFormGroup.patchValue({
              name: resp.name,
              email: resp.email,
              address: resp.address,
              phoneNo: resp.phoneNo,
            });
            this.isAddEmployee = false;
          }
        }),
        takeUntil(this._destroy$)
      )
      .subscribe();
  }
}
