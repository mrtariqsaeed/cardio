import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Merck } from '../models/merck';

@Injectable({
  providedIn: 'root'
})
export class AmAuthService {

  constructor(protected storage: LocalStorage){}
//, { schema: { type: 'object', properties: { id: {type: 'string'}, name: {type: 'string'}, email: {type: 'string'}, date: {type: 'timestamp'}, verified: {type: 'boolean'} }, required: ['id', 'name', 'email'] } }
  checkLogin(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.storage.getItem<Merck>('user').subscribe((data) => {
          //this.user = data;
          console.log(data);
          if(data)
          {
            return resolve(true);
          }

          return resolve(false);
       }, (error)=>{
         return resolve(false);
       });
    })
  }

  logout(): Promise<boolean>
  {
    return new Promise((resolve, reject) => {
      this.storage.clear().subscribe(() => {
            return resolve(true);
       }, (error)=>{
         return resolve(false);
       });
    })
  }
}
