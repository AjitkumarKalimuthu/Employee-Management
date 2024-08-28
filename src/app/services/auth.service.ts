import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  privilegeType$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >('');
  constructor(private http: HttpClient) {
    this.privilegeType$.next(this.getStoredRole());
  }

  login(username: string, password: string): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}?username=${username}&password=${password}`)
      .pipe(
        tap((resp) => {
          if (resp?.length > 0) {
            this.setStoredRole(resp[0].privilegeType);
          }
        })
      );
  }

  private getStoredRole(): string | null {
    return localStorage.getItem('privilegeType');
  }

  private setStoredRole(role: string) {
    localStorage.setItem('privilegeType', role);
    this.privilegeType$.next(role);
  }
}
