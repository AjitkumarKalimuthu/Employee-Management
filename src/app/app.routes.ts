import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AddOrEditEmployeeComponent } from './add-or-edit-employee/add-or-edit-employee.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'employee-list',
    component: EmployeeListComponent,
  },
  {
    path: 'update-employee/:id',
    component: AddOrEditEmployeeComponent,
  },
  {
    path: 'employee-details/:id',
    component: EmployeeDetailsComponent,
  },
];
