export interface Employee {
  id: number;
  name: string;
  email: string;
  privilegeType?: string;
  address: string;
  phoneNo: string;
  selected?: boolean;
}
export interface EmployeesPerformanceDetails {
  name: string;
  role: string;
  score: number;
  currentMonthScore: string;
  lastMonthScore: string;
}
