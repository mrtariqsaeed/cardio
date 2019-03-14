import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as $ from "jquery";
import { Location } from '@angular/common';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class SignupComponent implements OnInit {
  merck = { name: '', email: '', password: '' };
  password:string = '';

  merckUsers: Observable<any[]>;
  err = '';
  emailErr = '';
  selectedIndex = 0;
  encPass = "merck2019";

  constructor( private router: Router, private location: Location, private afs: AngularFirestore) {

  }

  ngOnInit() {
  }

  checkEmail()
  {
    if(this.merck.email == '')
    {
      this.emailErr = 'Email is required!';
    }else
    {
      let email = this.merck.email.toLowerCase();
      this.afs.doc('merck/' + email).ref.get().then((doc) => {
      //console.log(doc.exists);
        if(doc.exists)
        {
          if(doc.data().status == '0')
          {
            this.selectedIndex++;
          }else{
            this.emailErr = 'Already Registered!';
          }
        }else{
          this.emailErr = 'This email can not register!';
        }
      });
    }
  }

  signup()
  {
    let today = new Date();

    if(this.merck.name == '' || this.merck.password == '' || this.password == '')
    {
      this.err = "All fields are required!";
    }
    else if(this.merck.password != this.password)
    {
      this.err = "Passwords don't match!";
    }
    else
    {
      let pass = CryptoJS.AES.encrypt(this.merck.password.trim(), this.encPass.trim()).toString();

      this.afs.doc('merck/' + this.merck.email).update({name: this.merck.name, email: this.merck.email, password: pass, date: today, status: '1'}).then(()=>{
        this.selectedIndex++;
      });
    }
    //this.newPass = CryptoJS.AES.decrypt(this.merck.password.trim(), this.encPass.trim()).toString(CryptoJS.enc.Utf8);

  }

  goLogin()
  {
    this.router.navigate(['/login']);
  }

  // amSignup()
  // {
  //   let today = new Date();
  //   this.am.date = today;
  //   if(this.am.name == '' || this.am.email == '' || this.am.password == '' || this.amPassword == '')
  //   {
  //     this.errAM = "All fields are required!";
  //   }else if(this.am.password != this.amPassword)
  //   {
  //     this.errAM = "Passwords don't match!";
  //   }
  //   else{
  //     this.afs.collection('merck').add(this.am).then(() => {
  //       this.errAM = '';
  //       this.am = { amID: '', name: '', email: '', date: today, password: '', verified: false, role: 'am' };
  //       this.amPassword = '';
  //       $('#formAM').slideUp('fast', function(){
  //         $('#successAM').slideDown();
  //       });
  //
  //     })
  //   }
  //
  //   // console.log(this.user);
  // }
  //
  // psSignup()
  // {
  //   let today = new Date();
  //   this.am.date = today;
  //   if(this.ps.name == '' || this.ps.email == '' || this.ps.password == '' || this.psPassword == '')
  //   {
  //     this.errAM = "All fields are required!";
  //   }else if(this.ps.password != this.psPassword)
  //   {
  //     this.errPS = "Passwords don't match!";
  //   }
  //   else{
  //     this.afs.collection('merck').add(this.ps).then(() => {
  //       this.errPS = '';
  //       this.ps = { amID: '', name: '', email: '', date: today, password: '', verified: false, role: 'ps' };
  //       this.psPassword = '';
  //       $('#formPS').slideUp('fast', function(){
  //         $('#successPS').slideDown();
  //       });
  //
  //     })
  //   }
  //
  //   // console.log(this.user);
  // }

  // refresh()
  // {
  //   $('#success').slideUp('fast', function(){
  //     $('#form').slideDown();
  //   });
  // }
  //
  // refreshAM()
  // {
  //   $('#successAM').slideUp('fast', function(){
  //     $('#formAM').slideDown();
  //   });
  // }
  //
  // refreshPS()
  // {
  //   $('#successPS').slideUp('fast', function(){
  //     $('#formPS').slideDown();
  //   });
  // }

}
