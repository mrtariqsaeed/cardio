import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class SpeakersService {

  speakersRef: AngularFirestoreCollection<any>;
    speakers: Observable<any[]>;
    constructor(public afs: AngularFirestore) {
      this.speakersRef = this.afs.collection('speakers');
      this.speakers = this.speakersRef
      .snapshotChanges()
      .map(changes => {
          return changes.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
          });
      });
    }

    getSpeakers(): Observable<any[]>
    {
      return this.speakers;
    }

    getSpeakersByEvent(eventID): Observable<any[]>
    {
      let speakersRef = this.afs.collection('speakers', ref => ref.where('eventID', '==', eventID));
      let speakers = speakersRef
      .snapshotChanges()
      .map(changes => {
          return changes.map(a => {
              const data = a.payload.doc.data();
              const id = a.payload.doc.id;
              return { id, ...data };
          });
      });

      return speakers;
    }

  }
