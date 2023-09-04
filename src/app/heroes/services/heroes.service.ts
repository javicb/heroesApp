import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hero } from '../interfaces/hero.interface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }


   getHeroes(): Observable<Hero[]> {
     return this.httpClient.get<Hero[]>(`${this.baseUrl}/heroes`);
   }

}
