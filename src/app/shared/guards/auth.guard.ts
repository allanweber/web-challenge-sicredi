import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/shared/services/login.service';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | boolean {
    return this.canAcess();
  }

  canAcess() {
    const hasAccess = this.loginService.canAccess();

    if (!hasAccess) {
      this.router.navigate(['/login']);
    }

    return hasAccess;
  }
}
