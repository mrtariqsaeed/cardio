import { Component, OnInit, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  animal: string;
   name: string;

   constructor(public dialog: MatDialog) {}
   ngOnInit() {
   }
   openDialog(img): void {
     const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
       width: '90%',
       data: img
     });
   }

 }

 @Component({
   selector: 'dialog-overview-example-dialog',
   templateUrl: 'dialog-overview-example-dialog.html',
 })
 export class DialogOverviewExampleDialog {

   constructor(
     public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
     @Inject(MAT_DIALOG_DATA) public data: string) {}

   onNoClick(): void {
     this.dialogRef.close();
   }

 }
