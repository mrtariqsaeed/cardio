import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LocalStorage } from '@ngx-pwa/local-storage';
import { Merck } from '../models/merck';
import { Router } from '@angular/router';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { EventsService } from '../services/events.service';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SpeakersService } from '../services/speakers.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();
  events: any[];
  speakers = [];
  displayedColumns: string[] = ['id', 'date', 'governorate', 'speakers', 'attendees'];
  dataSource: MatTableDataSource<any>;
  role: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  ps = {} as Merck;
  constructor(public dialog: MatDialog, private speakersService: SpeakersService, private router: Router, private eventsService: EventsService, protected storage: LocalStorage) {
    this.sub1 = this.eventsService.getEvents().subscribe(data => {
      console.log(data);
      this.events = data;
      console.log(this.events);
      this.dataSource = new MatTableDataSource(this.events);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.sub2 = this.speakersService.getSpeakers().subscribe(data => {
      console.log(data);
      this.speakers = data;
    })
  }

  ngOnInit() {
    this.storage.getItem<Merck>('user').subscribe((data) => {
        //this.user = data;
        console.log(data);
        if(data)
        {
          this.ps = data;
          this.role = data.role;
        }

     }, (error)=>{

     });
  }

  goAttendees(id){
    console.log(id);
    this.router.navigate(['/attendees', id]);
  }

  viewSpeakers(eventID): void {
    let data = this.speakers.filter(speaker => speaker.eventID == eventID);
    console.log(data);
    const dialogRef = this.dialog.open(ViewSpeakersDialog, {
      width: '400px',
      data: data
    });

    dialogRef.afterClosed().subscribe(res => {
      //console.log('The dialog was closed');
      //this.animal = result;
    });
  }

  ngOnDestroy()
  {
    console.log('Leaving Home Page!');
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}


// ================================
//          View Dialog
// ================================
@Component({
  selector: 'view-speakers-dialog',
  templateUrl: 'view-speakers-dialog.html',
  styleUrls: ['./dashboard.component.scss']
})
export class ViewSpeakersDialog {

  constructor(
    public dialogRef: MatDialogRef<ViewSpeakersDialog>,
    @Inject(MAT_DIALOG_DATA) private data) {}

  close(): void {
    this.dialogRef.close();
  }

}
