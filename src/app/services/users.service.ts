import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersRef: AngularFirestoreCollection<any>;
    users: Observable<any[]>;
    constructor(public afs: AngularFirestore) {

    }

    getUsers(id): Observable<any[]>
    {
      this.usersRef = this.afs.collection('users', ref => ref.where('eventID', '==', id));
      this.users = this.usersRef
      .snapshotChanges()
      .map(changes => {
          return changes.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
          });
      });
      return this.users;
    }
}
