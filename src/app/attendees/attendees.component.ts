import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from '@angular/fire/firestore';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { UsersService } from '../services/users.service';
import * as $ from "jquery";
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Merck } from '../models/merck';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-attendees',
  templateUrl: './attendees.component.html',
  styleUrls: ['./attendees.component.scss']
})
export class AttendeesComponent implements OnInit {
  event: Observable<any>;
  date = new Date();
  user = { psID: '',amID:'', eventID: '', name: '', email: '', mobile: '', specialty: '', title: '', governorate: '', clinic: '', institute: '', age: '', md: '', date: this.date, password: '', status: 'Pending' };
  selectedTab = 0;
  merck = {} as Merck;
  sub1: Subscription = new Subscription();
  users: any[];
  displayedColumns: string[] = ['id', 'name', 'status', 'view', 'action'];
  dataSource: MatTableDataSource<any>;
  err: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  eventID: string;
  speakers: Observable<any[]>;
  role: string;

  constructor(private http:HttpClient, public dialog: MatDialog, private usersService: UsersService, private route: ActivatedRoute, private location: Location, private afs: AngularFirestore, protected storage: LocalStorage) {

  }

  ngOnInit() {
    this.storage.getItem<Merck>('user').subscribe((data) => {
        //this.user = data;
        console.log(data);
        if(data)
        {
          this.merck = data;
          this.role = data.role;
        }

     }, (error)=>{

     });

    this.eventID = this.route.snapshot.paramMap.get('id');
    this.user.eventID = this.eventID;
    this.speakers = this.afs.collection('speakers', ref=> ref.where('eventID', '==', this.eventID)).valueChanges();
    this.event = this.afs.doc('events/' + this.eventID).valueChanges();
    this.sub1 = this.usersService.getUsers(this.eventID).subscribe(data => {
      console.log(data);
      if(this.merck.role == 'ps')
      {
        this.users = data.filter(dr => dr.psID == this.merck.id);
      }else{
        this.users = data.filter(dr => dr.amID == this.merck.id);
      }

      console.log(this.users);
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  goBack()
  {
    this.location.back();
  }

  tabChanged($event)
  {
    this.selectedTab = $event.index;
  }

  register()
  {
    let today = new Date();
    this.user.date = today;
    this.user.psID = this.merck.id;
    this.user.amID = this.merck.amID;

    if(this.user.name == '' /*|| this.user.mobile == '' || this.user.specialty == '' || this.user.title == '' || this.user.governorate == '' || this.user.clinic == '' || this.user.institute == '' || this.user.age == '' || this.user.md == ''*/)
    {
      //this.err = "All fields are required!";
    }else{
      this.user.age = String(this.user.age);
      this.afs.collection('users').add(this.user).then(() => {
        this.err = '';
        this.user = { psID: this.merck.id, amID:this.merck.amID, eventID: this.eventID, name: '', email: '', mobile: '', specialty: '', title: '', governorate: '', clinic: '', institute: '', age: '', md: '', date: this.date, password: '', status: 'Pending' };
        $('#form').slideUp('fast', function(){
          $('#success').slideDown();
        });

      })
    }

    // console.log(this.user);
  }

  refresh()
  {
    $('#success').slideUp('fast', function(){
      $('#form').slideDown();
    });
  }

  viewAttendee(user): void {
    const dialogRef = this.dialog.open(ViewDialog, {
      width: '500px',
      data: user
    });

    dialogRef.afterClosed().subscribe(res => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  editAttendee(user): void {
    const dialogRef = this.dialog.open(EditDialog, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res)
      {
        let doc = {eventID: this.eventID, name: res.name, email: res.email, mobile: res.mobile, specialty: res.specialty, title: res.title, governorate: res.governorate, clinic: res.clinic, institute: res.institute, age: res.age, md: res.md, password: '', status: 'Pending'}
        this.afs.doc('users/' + res.id).update(doc).then(()=>{
          //console.log('done');
        });
      }

    });
  }

  deleteAttendee(user): void {
    const dialogRef = this.dialog.open(DeleteDialog, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        this.afs.doc('users/' + res.id).delete().then(()=>{
          console.log('done');
        });
      }

    });
  }

  approveAttendee(user): void {
    const dialogRef = this.dialog.open(ApproveDialog, {
      width: '400px',
      data: user
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res){
        console.log(res);
        this.afs.doc('users/' + res.id).update({status: 'Approved'}).then(()=>{
          let DRname = res.name;
          //======================
          //Send email to doctor
          const drMail = {
            toEmail: res.email,
            text: `Dear Dr. ${DRname}; \n
            You are invited to the upcoming Cardiology Olympics Event that will take place in cairo next friday.\n
            Your also granted access to Cardiology Olympics website, so kindly signup to access your profile and get connected with your team.\n
            Please don't hesitate to contact us for any further assistance or clarification.\n\n
            Sincerly,\n
            Cardiolog Olympics Team\n
            Merck LTD Egypt\n


            <a href='https://cardio-merck.firebaseapp.com' style='text-align:center;font-size:10px'>Unsubscribe</a>
            `,
            message: `<strong>Dear Dr. ${DRname}; </strong><br><br>
            &nbsp;&nbsp;&nbsp;&nbsp;You are invited to the upcoming Cardiology Olympics Event that will take place in cairo next friday.<br>
            Your also granted access to Cardiology Olympics website, so kindly <a href='https://cardio-merck.firebaseapp.com/signup'>signup</a> to access your profile and get connected with your team.<br>
            Please don't hesitate to contact us for any further assistance or clarification.<br><br>

            Sincerly,<br>
            <b>Cardiolog Olympics Team</b><br><br>

            <img src="https://i.ibb.co/thqT1bn/cardio.jpg" alt="Cardiology Olympics Logo" /><br><br>

            <div style='width:100%;text-align:center;'><a href='https://cardio-merck.firebaseapp.com' style='text-align:center;font-size:10px;color:#666;'>Unsubscribe</a></div>
            `
          }
          this.http.post('https://us-central1-cardio-merck.cloudfunctions.net/httpEmail', drMail).toPromise().then((res)=>{console.log(res)}, (err)=>{console.log(err)});

          //==========================
          //Send SMS
          const drSMS = {
            toNumber: res.mobile,//res.number,
            message: `Dear Dr. ${DRname}, you are kindly invited to attend Cardiology Olympics Event`
          }
          this.http.post('https://us-central1-cardio-merck.cloudfunctions.net/httpSMS', drSMS).toPromise().then((res)=>{console.log(res)}, (err)=>{console.log(err)});

          //======================
          //Send email to ps
          let psID = res.psID;
          this.afs.doc('merck/' + psID).ref.get().then(doc => {
            if(doc.exists)
            {
              let psEmail = doc.data().email;
              let psName = doc.data().name;

              const psMail = {
                toEmail: psID,
                text: `Dear ${psName}; \n
                Kindly be informed that your proposed attendee Dr. ${DRname} has been approved by your area manager.\n
                Dr. ${DRname} has received email and sms invitation and also granted access to Cardiology Olympics Website.\n
                Please don't hesitate to contact us for any further assistance or clarification.\n\n
                Sincerly,\n
                Cardiolog Olympics Team\n
                Merck LTD Egypt\n


                <a href='https://cardio-merck.firebaseapp.com' style='text-align:center;font-size:10px'>Unsubscribe</a>
                `,
                message: `<strong>Dear ${psName}; </strong><br><br>
                &nbsp;&nbsp;&nbsp;&nbsp;Kindly be informed that your proposed attendee Dr. ${DRname} has been approved by your area manager.<br>
                Dr. ${DRname} has received email and sms invitation and also granted access to Cardiology Olympics Website.<br>
                Please don't hesitate to contact us for any further assistance or clarification.<br><br>

                Sincerly,<br>
                <b>Cardiolog Olympics Team</b><br><br>

                <img src="https://i.ibb.co/thqT1bn/cardio.jpg" alt="Cardiology Olympics Logo" /><br><br>

                <div style='width:100%;text-align:center;'><a href='https://cardio-merck.firebaseapp.com' style='text-align:center;font-size:10px;color:#666;'>Unsubscribe</a></div>
                `
              }
              this.http.post('https://us-central1-cardio-merck.cloudfunctions.net/httpEmail', psMail).toPromise().then((res)=>{console.log(res)}, (err)=>{console.log(err)});

            }
          });


        });
      }

    });
  }

  ngOnDestroy()
  {
    console.log('Leaving Home Page!');
    this.sub1.unsubscribe();
  }

}


// ================================
//          View Dialog
// ================================
@Component({
  selector: 'view-dialog',
  templateUrl: 'view-dialog.html',
  styleUrls: ['./attendees.component.scss']
})
export class ViewDialog {

  constructor(
    public dialogRef: MatDialogRef<ViewDialog>,
    @Inject(MAT_DIALOG_DATA) private data) {}

  close(): void {
    this.dialogRef.close();
  }

}


// ================================
//          Edit Dialog
// ================================
@Component({
  selector: 'edit-dialog',
  templateUrl: 'edit-dialog.html',
  styleUrls: ['./attendees.component.scss']
})
export class EditDialog {

  constructor(
    public dialogRef: MatDialogRef<EditDialog>,
    @Inject(MAT_DIALOG_DATA) private user) {}

  close(): void {
    this.dialogRef.close();
  }

}


// ================================
//          Delete Dialog
// ================================
@Component({
  selector: 'delete-dialog',
  templateUrl: 'delete-dialog.html',
  styleUrls: ['./attendees.component.scss']
})
export class DeleteDialog {

  constructor(
    public dialogRef: MatDialogRef<DeleteDialog>,
    @Inject(MAT_DIALOG_DATA) private user) {}

  close(): void {
    this.dialogRef.close();
  }

}


// ================================
//          Approve Dialog
// ================================
@Component({
  selector: 'approve-dialog',
  templateUrl: 'approve-dialog.html',
  styleUrls: ['./attendees.component.scss']
})
export class ApproveDialog {

  constructor(
    public dialogRef: MatDialogRef<ApproveDialog>,
    @Inject(MAT_DIALOG_DATA) private user) {}

  close(): void {
    this.dialogRef.close();
  }

}
