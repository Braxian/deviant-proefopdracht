import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Oefening } from '../oefening/models/oefening.model';
import { Observable, delay, map } from 'rxjs';
import { parse } from 'yaml';

@Service()
export class OefeningService {
  private http = inject(HttpClient);

  crashOefening() {}

  getOefening(): Observable<Oefening> {
    return this.http
      .get('/data/oefening.yaml', {
        responseType: 'text',
      })
      .pipe(delay(2000))
      .pipe(map((data) => parse(data) as Oefening));
  }
}
