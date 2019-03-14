import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Merck } from '../models/merck';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(protected storage: LocalStorage, private router: Router){}
//, { schema: { type: 'object', properties: { id: {type: 'string'}, name: {type: 'string'}, email: {type: 'string'}, date: {type: 'timestamp'}, verified: {type: 'boolean'} }, required: ['id', 'name', 'email'] } }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.getItem<Merck>('user').subscribe((data) => {
          //this.user = data;
          console.log(data);
          if(data)
          {
            return resolve(true);
          }else{
            this.router.navigate(['/login']);
            return resolve(false);
          }

       }, (error)=>{
         this.router.navigate(['/login']);
         return resolve(false);
       });
    })

  }

}
