import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Dragon } from '../models/dragon.model';

@Injectable({
  providedIn: 'root',
})
export class DragonService {
  private url = environment.dragonApi;

  constructor(private httpClient: HttpClient) {}

  getDragons(): Observable<Dragon[]> {
    return this.httpClient.get<Dragon[]>(this.url).pipe(
      map((res: Dragon[]) => {
        const ordered = res.sort((left, right) =>
          left.name.localeCompare(right.name),
        );

        return ordered;
      }),
    );
  }

  getDragon(id: string): Observable<Dragon> {
    return this.httpClient.get<Dragon>(`${this.url}/${id}`);
  }

  createDragon(dragon: Dragon): Observable<any> {
    return this.httpClient.post(this.url, dragon);
  }

  updateDragon(id: string, dragon: Dragon): Observable<any> {
    return this.httpClient.put(`${this.url}/${id}`, dragon);
  }

  deleteDragon(id: string): Observable<Dragon[]> {
    return this.httpClient.delete<Dragon[]>(`${this.url}/${id}`);
  }
}
