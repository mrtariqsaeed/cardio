import { Component, OnInit } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Merck } from '../models/merck';

@Component({
  selector: 'app-am',
  templateUrl: './am.component.html',
  styleUrls: ['./am.component.scss']
})
export class AmComponent implements OnInit {

  am = {} as Merck;
  constructor(protected storage: LocalStorage) {}

  ngOnInit() {
    this.storage.getItem<Merck>('user').subscribe((data) => {
        //this.user = data;
        console.log(data);
        if(data)
        {
          this.am = data;
        }

     }, (error)=>{

     });
  }

}
