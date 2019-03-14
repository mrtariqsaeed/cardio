import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { LocalStorage } from '@ngx-pwa/local-storage';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  date = new Date();
  user = { name: '', mobile: '', specialty: '', title: '', governorate: '', clinic: '', institute: '', age: '', md: '', date: this.date };
  merck = {email: '', password: ''};
  am = {email: '', password: ''};
  ps = {email: '', password: ''};
  errMerck = '';
  err = '';
  errAM = '';
  errPS = '';
  amCol;
  AMs = [];
  selectedTab = 0;
  encPass = 'merck2019';

  constructor(protected storage: LocalStorage, private afs: AngularFirestore, private router: Router) {
    this.amCol = this.afs.collection('am')
    .snapshotChanges()
    .map(changes => {
        return changes.map(a => {
            const data = a.payload.doc.data();
            const id = a.payload.doc.id;
            return { id, ...data };
        });
    });

    this.amCol.subscribe(data => {
      this.AMs = data;
    })
  }

  ngOnInit() {
  }

  tabChanged($event)
  {
    this.selectedTab = $event.index;
  }

  login(){
    if(this.merck.email == '' || this.merck.password == '')
    {
      this.errMerck = "All fields are required!";
    }else{
      let loginEmail = this.merck.email.toLowerCase();
      this.afs.doc('merck/' + loginEmail).ref.get().then(doc => {
        if(doc.exists)
        {
          if(doc.data().status == '1')
          {
            let cipher = doc.data().password;
            let plain = CryptoJS.AES.decrypt(cipher.trim(), this.encPass.trim()).toString(CryptoJS.enc.Utf8);

            if(this.merck.password == plain)
            {
              let dataRow = doc.data();
              let merckUser = { id: loginEmail,amID: dataRow.amID, name: dataRow.name, email: dataRow.email, role: dataRow.role };
              this.storage.clear().subscribe(()=>{
                this.storage.setItem('user', merckUser).subscribe((data)=>{console.log(data)}, (err) => {console.log(err)});
                this.router.navigateByUrl('/dashboard');
              })
            }
          }
        }
      })

      // col.subscribe(data => {
      //   if(data.length == 1)
      //   {
      //     let dataRow = data[0];
      //     //let psUser = { id: dataRow.id, name: dataRow.name, email: dataRow.email, role: dataRow.role };
      //     this.storage.clear().subscribe(()=>{
      //       this.storage.setItem('user', dataRow).subscribe((data)=>{console.log(data)}, (err) => {console.log(err)});
      //       this.router.navigateByUrl('/dashboard');
      //     })
      //
      //   }else{
      //     this.errPS = 'Invalid Login!';
      //   }
      // });
    }

  }



  // amLogin(){
  //   if(this.am.email == '' || this.am.password == '')
  //   {
  //     this.errAM = "All fields are required!";
  //   }else{
  //     let am = this.AMs.find(am => am.email == this.am.email && am.password == this.am.password);
  //     if(am)
  //     {
  //       this.storage.setItem('user', am).subscribe((data)=>{console.log(data)}, (err) => {console.log(err)});
  //       this.router.navigateByUrl('/dashboard');
  //     }else{
  //       this.errAM = 'Invalid Login!';
  //     }
  //   }
  //
  // }

  // psLogin(){
  //   if(this.ps.email == '' || this.ps.password == '')
  //   {
  //     this.errPS = "All fields are required!";
  //   }else{
  //     let col = this.afs.collection('ps', ref => {
  //       return ref.where('email', '==', this.ps.email)
  //       .where('password', '==', this.ps.password)
  //     }).snapshotChanges()
  //     .map(changes => {
  //         return changes.map(a => {
  //             const data = a.payload.doc.data();
  //             const id = a.payload.doc.id;
  //             return { id, ...data };
  //         });
  //     });
  //
  //     col.subscribe(data => {
  //       if(data.length == 1)
  //       {
  //         let dataRow = data[0];
  //         //let psUser = { id: dataRow.id, name: dataRow.name, email: dataRow.email, role: dataRow.role };
  //         this.storage.clear().subscribe(()=>{
  //           this.storage.setItem('user', dataRow).subscribe((data)=>{console.log(data)}, (err) => {console.log(err)});
  //           this.router.navigateByUrl('/dashboard');
  //         })
  //
  //       }else{
  //         this.errPS = 'Invalid Login!';
  //       }
  //     });
  //   }
  //
  // }
    // console.log(this.user);

}
