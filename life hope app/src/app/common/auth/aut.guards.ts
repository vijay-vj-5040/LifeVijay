import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from "rxjs";
import { map,take } from "rxjs/operators";
import { AuthService } from './auth.service';
@Injectable()

export class AuthGuard implements CanActivate{
    constructor(private authService:AuthService,
        private router :Router,
        ){}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    
        return this.authService.isLoggedIn.pipe(
        take(1),
        map((isloggesIn:boolean)=>{
            if(!isloggesIn){
                this.router.navigate(['/login']);
                return false;
            }
            return true;
        })
    )
    }
}