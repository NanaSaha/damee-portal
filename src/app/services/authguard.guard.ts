import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApisService } from "../services/apis.service";

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {
  constructor(private apiService: ApisService, private router: Router) { }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  
  //   // return true;

  //   let isAuth = this.apiService.isAuthenticated();
 
  //   if (!isAuth) {
  //     console.log("ISAuth is", isAuth)
  //     //  this.router.navigate(['upgrade']);
  //     console.log("RUnning this and other")
  //     return false;
  //   }
  //   else {
  //     console.log("AUthed")
  //     return true;
  //   }
  // }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let isAuth = this.apiService.isAuthenticated();
    if (!isAuth) {
      console.log("ISAuth is", isAuth)
     this.router.navigate(['upgrade']);  
    }
    else {
      console.log("AUTHED")
      // this.router.navigate(['upgrade']);  
      return true;
    }
  }
  
}
