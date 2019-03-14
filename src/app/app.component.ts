import { Component } from '@angular/core';
import { AmAuthService } from './auth/am-auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { LocalStorage } from '@ngx-pwa/local-storage';
import 'rxjs/add/operator/filter';
import { Merck } from './models/merck';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  am: boolean = false;
  ps: boolean = false;
  loggedIn: boolean = false;
  constructor(protected storage: LocalStorage, private location: Location, private amAuth: AmAuthService, private router: Router){
    // this.amAuth.checkLogin().then(res => {
    //   console.log(res);
    //   this.am = res;
    //   this.loggedIn = res;
    // });

    this.router.events.filter(event => event instanceof NavigationEnd)
    .subscribe((event:NavigationEnd) => {
      this.storage.getItem<Merck>('user').subscribe((data) => {
          //this.user = data;
          console.log(data);
          if(data)
          {
            if(data.role == 'am')
            {
              this.ps = false;
              this.am = true;
              this.loggedIn = true;
            }else{
              this.ps = true;
              this.am = false;
              this.loggedIn = true;
            }

          }else{
            this.ps = false;
            this.am = false;
            this.loggedIn = false;
          }

       }, (error)=>{
         this.ps = false;
         this.am = false;
         this.loggedIn = false;
       });
    });


  }
  title = 'cardio';

  logout()
  {
    this.amAuth.logout().then(() => {
      //this.router.navigate()
    });

  }
}
