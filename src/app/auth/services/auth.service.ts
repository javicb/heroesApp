import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private AUTH: Auth | undefined;

  get auth(): Auth {
    return { ...this.AUTH! };
  }

  constructor(private http: HttpClient) { }

  verificarLogin(): Observable<boolean> {
    if (!localStorage.getItem('id')) {
      return of(false);
    }

    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        map(auth => {
          this.AUTH = auth;
          return true;
        })
      );
  }

  login(): Observable<Auth> {
    return this.http.get<Auth>(`${this.baseUrl}/usuarios/1`)
      .pipe(
        tap(resp => this.AUTH = resp),
        tap(resp => localStorage.setItem('id', resp.id))
      );
  }

  logout(): void {
    this.AUTH = undefined;
  }
}
