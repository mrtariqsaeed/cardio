import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  eventsRef: AngularFirestoreCollection<any>;
    events: Observable<any[]>;
    constructor(public afs: AngularFirestore) {
      this.eventsRef = this.afs.collection('events', ref => ref.orderBy('date', 'asc'));
      this.events = this.eventsRef
      .snapshotChanges()
      .map(changes => {
          return changes.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
          });
      });
    }

    getEvents(): Observable<any[]>
    {
      return this.events;
    }

  }
