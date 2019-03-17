import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { CookiesService } from 'src/app/core/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usersUrl = 'assets/data/users.json';
  private cookieName = 'user-id';

  constructor(private httpClient: HttpClient, private cookie: CookiesService) {}

  validateAceess(user: User): Observable<boolean> {
    return this.httpClient.get<User[]>(this.usersUrl).pipe(
      map(response => {
        const hasAccess = response.some(
          item => item.email === user.email && item.password === user.password,
        );

        if (hasAccess) {
          // Para simular o login e a expiração dele, o cookie expira em 5 minutos
          this.cookie.setCookie(this.cookieName, user.email, 5);
        }

        return hasAccess;
      }),
    );
  }

  canAccess() {
    return this.cookie.getCookie(this.cookieName) !== '';
  }
}
