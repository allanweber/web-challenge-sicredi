import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';
import { IFormCanDeactivate } from 'src/app/core/iform-candeactivate';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<IFormCanDeactivate> {

    canDeactivate(
        component: IFormCanDeactivate,
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {

        return component.canDeactivate();
    }
}
