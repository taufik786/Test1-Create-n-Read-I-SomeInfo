import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router
} from "@angular/router";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate( route: ActivatedRouteSnapshot ): boolean {
    const currentUser = this.authService.currentUserValue;
    if (!currentUser) {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
