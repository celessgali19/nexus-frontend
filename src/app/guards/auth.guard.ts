import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor( private router: Router) { }

    canActivate() {
        let token = localStorage.getItem("token");
        if (token) {
            this.router.navigate(['/landing']);
            return false;
        } 

        return true;
    }
}
