import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, UrlSegment , Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate, CanLoad {

  constructor( private router: Router){}

  canActivate(

    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if( JSON.parse( localStorage.getItem('userPaci')! ).id == "629d1b436efd6dd562cd4856" ){
    
        return true; 
      }
      else{
        this.router.navigate(['./home']);
      
        return false;
      }
    return true;
  }
  
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {

      if(  JSON.parse( localStorage.getItem('userPaci')! ).id == "629d1b436efd6dd562cd4856" ){
        console.log("Hola")
        return true; 
      }
      else{
        this.router.navigate(['./home']);
        
        return false;
      }
      
  }
}
