import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ERMSServices } from '../Services/ermsservices.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: ERMSServices
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        debugger
        var TriggeredUrlVal = route.url[0].path;
        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser != null && currentUser != undefined) {
            switch (TriggeredUrlVal) {
                case "Login":
                    this.router.navigateByUrl("Home");
                    return false;
                    break;
            }
            // logged in so return true
            return true;
        }
        else if (TriggeredUrlVal === "Login") {
            this.authenticationService.logout();
            return true;
        }
        else {
            this.authenticationService.logout();
            this.router.navigate(['Login'], { queryParams: { returnUrl: state.url } });
            return false;
        }
    }

}
